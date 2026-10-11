<#
.SYNOPSIS
    Export a project source-code snapshot to Markdown files.

.DESCRIPTION
    This script scans the current project, creates a project directory tree,
    and exports supported text/source files into one or more Markdown files.

    Designed for:
    - React
    - TypeScript
    - Vite
    - Power Apps Code Apps
    - Dataverse
    - Fluent UI
    - TanStack Query

    The generated Markdown can be uploaded to Copilot for:
    - Architecture analysis
    - Code review
    - Dependency analysis
    - Dataverse integration analysis
    - Debugging
    - Documentation generation

.NOTES
    Recommended location:
    Place this script in the project root directory.

    Example:
    .\Export-ProjectSource.ps1

    If PowerShell blocks the script:
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    .\Export-ProjectSource.ps1
#>

[CmdletBinding()]
param (
    # Project root. Defaults to the directory containing this script.
    [Parameter(Mandatory = $false)]
    [string]$ProjectRoot = $PSScriptRoot,

    # Base name of the generated Markdown file.
    [Parameter(Mandatory = $false)]
    [string]$OutputFileName = "PMT-Project-Source.md",

    # Maximum size of each generated Markdown file in MB.
    # When the limit is reached, the script creates Part-001, Part-002, etc.
    [Parameter(Mandatory = $false)]
    [ValidateRange(1, 100)]
    [int]$MaxOutputFileSizeMB = 15,

    # Include package-lock.json. This file can be very large and is excluded by default.
    [Parameter(Mandatory = $false)]
    [switch]$IncludePackageLock,

    # Include common generated source directories.
    [Parameter(Mandatory = $false)]
    [switch]$IncludeGeneratedCode,

    # Include JSON files under generated-code directories.
    [Parameter(Mandatory = $false)]
    [switch]$IncludeGeneratedJson,

    # Include log files.
    [Parameter(Mandatory = $false)]
    [switch]$IncludeLogs
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# =============================================================================
# Configuration
# =============================================================================

# Directories that are always excluded.
$ExcludedDirectories = @(
    ".git",
    ".github",
    ".idea",
    ".vs",
    ".vscode",
    ".power",
    "node_modules",
    "dist",
    "build",
    "coverage",
    "out",
    "bin",
    "obj",
    "packages",
    ".next",
    ".nuxt",
    ".cache",
    ".parcel-cache",
    ".turbo",
    ".vite",
    "storybook-static",
    "test-results",
    "playwright-report",
    "__pycache__"
)

# Generated-code directories excluded unless -IncludeGeneratedCode is supplied.
$GeneratedCodeDirectories = @(
    "generated",
    "Generated",
    "generated-src",
    "generatedServices",
    "generated-services"
)

# Exact file names excluded for security or because they add little architectural value.
$ExcludedFileNames = @(
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    ".npmrc",
    ".yarnrc",
    ".pnpmfile.cjs",
    "secrets.json",
    "secret.json",
    "credentials.json",
    "credential.json",
    "appsettings.Development.json",
    "Thumbs.db",
    ".DS_Store",
    $OutputFileName
)

# Patterns that may contain credentials, certificates, or private keys.
$SensitiveFilePatterns = @(
    "*.pem",
    "*.key",
    "*.pfx",
    "*.p12",
    "*.cer",
    "*.crt",
    "*.der",
    "*.jks",
    "*.keystore",
    "*secret*",
    "*credential*",
    "*private-key*",
    "*private_key*"
)

# Supported source and text file extensions.
$IncludedExtensions = @(
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".json",
    ".jsonc",
    ".md",
    ".txt",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".html",
    ".htm",
    ".xml",
    ".yml",
    ".yaml",
    ".toml",
    ".ini",
    ".config",
    ".conf",
    ".cs",
    ".csproj",
    ".sln",
    ".props",
    ".targets",
    ".xaml",
    ".ps1",
    ".psm1",
    ".psd1",
    ".sh",
    ".bat",
    ".cmd",
    ".sql",
    ".graphql",
    ".gql"
)

# Extension-free files that are useful for understanding a project.
$IncludedExtensionlessFiles = @(
    "Dockerfile",
    "Makefile",
    "Procfile",
    "LICENSE",
    "NOTICE"
)

# Files ignored by default because they are normally very large or generated.
$LargeGeneratedFiles = @(
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "npm-shrinkwrap.json"
)

# Individual source files larger than this are skipped.
$MaxIndividualFileSizeMB = 5

# =============================================================================
# Helper functions
# =============================================================================


function Write-Status {
    param (
        [AllowEmptyString()]
        [string]$Message = "",

        [ConsoleColor]$Color = [ConsoleColor]::Gray
    )

    if ([string]::IsNullOrEmpty($Message)) {
        Write-Host
    }
    else {
        Write-Host $Message -ForegroundColor $Color
    }
}

function Get-NormalizedFullPath {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    return [System.IO.Path]::GetFullPath($Path).TrimEnd(
        [System.IO.Path]::DirectorySeparatorChar,
        [System.IO.Path]::AltDirectorySeparatorChar
    )
}

function Get-RelativeProjectPath {
    param (
        [Parameter(Mandatory = $true)]
        [string]$FullPath,

        [Parameter(Mandatory = $true)]
        [string]$RootPath
    )

    $normalizedRoot = Get-NormalizedFullPath -Path $RootPath
    $normalizedFile = [System.IO.Path]::GetFullPath($FullPath)

    $rootUri = New-Object System.Uri(($normalizedRoot + [System.IO.Path]::DirectorySeparatorChar))
    $fileUri = New-Object System.Uri($normalizedFile)

    $relativeUri = $rootUri.MakeRelativeUri($fileUri)
    $relativePath = [System.Uri]::UnescapeDataString($relativeUri.ToString())

    return $relativePath.Replace("\", "/")
}


function Test-IsChildOfExcludedDirectory {
    param (
        [Parameter(Mandatory = $true)]
        [AllowEmptyString()]
        [string]$RelativePath
    )

    if ([string]::IsNullOrWhiteSpace($RelativePath)) {
        return $false
    }

    $normalizedPath = $RelativePath.Replace('\', '/')

    $pathParts = @(
        $normalizedPath.Split(
            [char[]]@('/'),
            [System.StringSplitOptions]::RemoveEmptyEntries
        )
    )

    foreach ($part in $pathParts) {
        if ($ExcludedDirectories -contains $part) {
            return $true
        }

        if (
            -not $IncludeGeneratedCode -and
            $GeneratedCodeDirectories -contains $part
        ) {
            return $true
        }
    }

    return $false
}

function Test-MatchesSensitivePattern {
    param (
        [Parameter(Mandatory = $true)]
        [string]$FileName
    )

    foreach ($pattern in $SensitiveFilePatterns) {
        if ($FileName -like $pattern) {
            return $true
        }
    }

    return $false
}

function Test-IsOutputFile {
    param (
        [Parameter(Mandatory = $true)]
        [string]$FileName
    )

    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($OutputFileName)

    if ($FileName -eq $OutputFileName) {
        return $true
    }

    if ($FileName -like "$baseName-Part-*.md") {
        return $true
    }

    return $false
}

function Test-ShouldIncludeFile {
    param (
        [Parameter(Mandatory = $true)]
        [System.IO.FileInfo]$File,

        [Parameter(Mandatory = $true)]
        [string]$RelativePath
    )

    if (Test-IsChildOfExcludedDirectory -RelativePath $RelativePath) {
        return $false
    }

    if (Test-IsOutputFile -FileName $File.Name) {
        return $false
    }

    if ($ExcludedFileNames -contains $File.Name) {
        return $false
    }

    if (Test-MatchesSensitivePattern -FileName $File.Name) {
        return $false
    }

    if (-not $IncludeLogs -and $File.Extension.ToLowerInvariant() -eq ".log") {
        return $false
    }

    if (-not $IncludePackageLock -and $LargeGeneratedFiles -contains $File.Name) {
        return $false
    }

    if ($File.Length -gt ($MaxIndividualFileSizeMB * 1MB)) {
        return $false
    }

    $extension = $File.Extension.ToLowerInvariant()

    if ($IncludedExtensions -contains $extension) {
        if (
            -not $IncludeGeneratedJson -and
            $extension -in @(".json", ".jsonc") -and
            ($RelativePath -match "(^|/)(generated|Generated|generated-src|generatedServices|generated-services)(/|$)")
        ) {
            return $false
        }

        return $true
    }

    if ([string]::IsNullOrWhiteSpace($extension)) {
        if ($IncludedExtensionlessFiles -contains $File.Name) {
            return $true
        }
    }

    return $false
}

function Get-MarkdownLanguage {
    param (
        [Parameter(Mandatory = $true)]
        [System.IO.FileInfo]$File
    )

    switch ($File.Extension.ToLowerInvariant()) {
        ".ts"      { return "typescript" }
        ".tsx"     { return "tsx" }
        ".js"      { return "javascript" }
        ".jsx"     { return "jsx" }
        ".mjs"     { return "javascript" }
        ".cjs"     { return "javascript" }
        ".json"    { return "json" }
        ".jsonc"   { return "jsonc" }
        ".md"      { return "markdown" }
        ".css"     { return "css" }
        ".scss"    { return "scss" }
        ".sass"    { return "sass" }
        ".less"    { return "less" }
        ".html"    { return "html" }
        ".htm"     { return "html" }
        ".xml"     { return "xml" }
        ".yml"     { return "yaml" }
        ".yaml"    { return "yaml" }
        ".toml"    { return "toml" }
        ".ini"     { return "ini" }
        ".config"  { return "text" }
        ".conf"    { return "text" }
        ".cs"      { return "csharp" }
        ".csproj"  { return "xml" }
        ".sln"     { return "text" }
        ".props"   { return "xml" }
        ".targets" { return "xml" }
        ".xaml"    { return "xml" }
        ".ps1"     { return "powershell" }
        ".psm1"    { return "powershell" }
        ".psd1"    { return "powershell" }
        ".sh"      { return "bash" }
        ".bat"     { return "batch" }
        ".cmd"     { return "batch" }
        ".sql"     { return "sql" }
        ".graphql" { return "graphql" }
        ".gql"     { return "graphql" }
        default    { return "text" }
    }
}

function Get-SafeFileContent {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    try {
        $content = [System.IO.File]::ReadAllText($Path)

        # Remove UTF-8 BOM if present.
        if ($content.Length -gt 0 -and [int][char]$content[0] -eq 65279) {
            $content = $content.Substring(1)
        }

        # Normalize line endings for consistent Markdown output.
        $content = $content -replace "`r`n", "`n"
        $content = $content -replace "`r", "`n"

        return $content
    }
    catch {
        return $null
    }
}

function Get-ProjectTree {
    param (
        [Parameter(Mandatory = $true)]
        [System.IO.FileInfo[]]$Files
    )

    $paths = @(
        $Files |
            ForEach-Object {
                Get-RelativeProjectPath -FullPath $_.FullName -RootPath $ProjectRoot
            } |
            Sort-Object
    )

    if ($paths.Count -eq 0) {
        return "(No supported source files found.)"
    }

    return ($paths -join "`n")
}

function Get-PartOutputPath {
    param (
        [Parameter(Mandatory = $true)]
        [int]$PartNumber,

        [Parameter(Mandatory = $true)]
        [bool]$UseMultipleParts
    )

    $outputDirectory = $ProjectRoot
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($OutputFileName)
    $extension = [System.IO.Path]::GetExtension($OutputFileName)

    if ([string]::IsNullOrWhiteSpace($extension)) {
        $extension = ".md"
    }

    if ($UseMultipleParts) {
        $fileName = "{0}-Part-{1:D3}{2}" -f $baseName, $PartNumber, $extension
    }
    else {
        $fileName = $baseName + $extension
    }

    return Join-Path -Path $outputDirectory -ChildPath $fileName
}

function Write-Utf8File {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Path,

        [Parameter(Mandatory = $true)]
        [string]$Content
    )

    # UTF-8 without BOM works well with Markdown and source code.
    $utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $utf8WithoutBom)
}

function Add-OutputPartMetadata {
    param (
        [Parameter(Mandatory = $true)]
        [System.Text.StringBuilder]$Builder,

        [Parameter(Mandatory = $true)]
        [int]$PartNumber
    )

    [void]$Builder.AppendLine("# PMT Plants Excellence Review - Project Source Snapshot")
    [void]$Builder.AppendLine("")
    [void]$Builder.AppendLine("> Snapshot part: $PartNumber")
    [void]$Builder.AppendLine("> Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
    [void]$Builder.AppendLine("> Project root: $ProjectRoot")
    [void]$Builder.AppendLine("")
    [void]$Builder.AppendLine("---")
    [void]$Builder.AppendLine("")
}

function Protect-MarkdownCodeFence {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Content
    )

    # Use four backticks for the outer code fence.
    # Existing three-backtick blocks inside Markdown files will not close it.
    return $Content
}

# =============================================================================
# Validation
# =============================================================================

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    throw "ProjectRoot could not be determined. Specify it using -ProjectRoot."
}

$ProjectRoot = Get-NormalizedFullPath -Path $ProjectRoot

if (-not (Test-Path -LiteralPath $ProjectRoot -PathType Container)) {
    throw "Project root does not exist: $ProjectRoot"
}

if ([System.IO.Path]::GetExtension($OutputFileName) -ne ".md") {
    $OutputFileName = [System.IO.Path]::GetFileNameWithoutExtension($OutputFileName) + ".md"
}

$maxOutputBytes = $MaxOutputFileSizeMB * 1MB

Write-Status "" Cyan
Write-Status "============================================================" Cyan
Write-Status " Project Source Export" Cyan
Write-Status "============================================================" Cyan
Write-Status "Project root : $ProjectRoot" Gray
Write-Status "Output name  : $OutputFileName" Gray
Write-Status "Part limit   : $MaxOutputFileSizeMB MB" Gray
Write-Status "" Gray

# =============================================================================
# Remove previous exports
# =============================================================================

$outputBaseName = [System.IO.Path]::GetFileNameWithoutExtension($OutputFileName)

$previousOutputs = Get-ChildItem -LiteralPath $ProjectRoot -File -ErrorAction SilentlyContinue |
    Where-Object {
        $_.Name -eq $OutputFileName -or
        $_.Name -like "$outputBaseName-Part-*.md"
    }

foreach ($previousOutput in $previousOutputs) {
    Remove-Item -LiteralPath $previousOutput.FullName -Force
    Write-Status "Removed previous export: $($previousOutput.Name)" DarkGray
}

# =============================================================================
# Discover source files
# =============================================================================

Write-Status "Scanning project files..." Yellow

$allFiles = @(
    Get-ChildItem -LiteralPath $ProjectRoot -File -Recurse -Force -ErrorAction SilentlyContinue
)

$includedFiles = New-Object System.Collections.Generic.List[System.IO.FileInfo]
$skippedLargeFiles = New-Object System.Collections.Generic.List[string]
$skippedUnreadableFiles = New-Object System.Collections.Generic.List[string]

foreach ($file in $allFiles) {
    $relativePath = Get-RelativeProjectPath -FullPath $file.FullName -RootPath $ProjectRoot

    if ($file.Length -gt ($MaxIndividualFileSizeMB * 1MB)) {
        if (-not (Test-IsChildOfExcludedDirectory -RelativePath $relativePath)) {
            $skippedLargeFiles.Add($relativePath)
        }

        continue
    }

    if (Test-ShouldIncludeFile -File $file -RelativePath $relativePath) {
        $includedFiles.Add($file)
    }
}

$includedFiles = @(
    $includedFiles |
        Sort-Object {
            Get-RelativeProjectPath -FullPath $_.FullName -RootPath $ProjectRoot
        }
)

Write-Status "Supported source files found: $($includedFiles.Count)" Green

if ($includedFiles.Count -eq 0) {
    throw "No supported source files were found in the project."
}

# =============================================================================
# Prepare project overview and file tree
# =============================================================================

$projectName = Split-Path -Leaf $ProjectRoot
$projectTree = Get-ProjectTree -Files $includedFiles

$overviewBuilder = New-Object System.Text.StringBuilder

[void]$overviewBuilder.AppendLine("# Project Overview")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("- Project name: $projectName")
[void]$overviewBuilder.AppendLine("- Export date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
[void]$overviewBuilder.AppendLine("- Included source files: $($includedFiles.Count)")
[void]$overviewBuilder.AppendLine("- Generated code included: $([bool]$IncludeGeneratedCode)")
[void]$overviewBuilder.AppendLine("- Package lock included: $([bool]$IncludePackageLock)")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("## Important interpretation")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("This document is a static snapshot of the project source code.")
[void]$overviewBuilder.AppendLine("It does not automatically synchronize with later GitHub commits.")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("Sensitive files, binary files, dependency folders, build outputs,")
[void]$overviewBuilder.AppendLine("and other excluded content are intentionally not included.")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("## Project file index")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("````text")
[void]$overviewBuilder.AppendLine("````")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("---")
[void]$overviewBuilder.AppendLine("")

# =============================================================================
# Export files
# =============================================================================

Write-Status "Exporting source code..." Yellow

$createdFiles = New-Object System.Collections.Generic.List[string]
$currentPart = 1
$currentBuilder = New-Object System.Text.StringBuilder

Add-OutputPartMetadata -Builder $currentBuilder -PartNumber $currentPart
[void]$currentBuilder.Append($overviewBuilder.ToString())

$filesExported = 0

foreach ($file in $includedFiles) {
    $relativePath = Get-RelativeProjectPath -FullPath $file.FullName -RootPath $ProjectRoot
    $language = Get-MarkdownLanguage -File $file
    $content = Get-SafeFileContent -Path $file.FullName

    if ($null -eq $content) {
        $skippedUnreadableFiles.Add($relativePath)
        Write-Status "Skipped unreadable file: $relativePath" DarkYellow
        continue
    }

    $content = Protect-MarkdownCodeFence -Content $content

    $fileSectionBuilder = New-Object System.Text.StringBuilder

    [void]$fileSectionBuilder.AppendLine("## File: $relativePath")
    [void]$fileSectionBuilder.AppendLine("")
    [void]$fileSectionBuilder.AppendLine("- Size: $($file.Length) bytes")
    [void]$fileSectionBuilder.AppendLine("- Last modified: $($file.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss'))")
    [void]$fileSectionBuilder.AppendLine("")
    [void]$fileSectionBuilder.AppendLine("````$language")
    [void]$fileSectionBuilder.AppendLine($content)

    if (-not $content.EndsWith("`n")) {
        [void]$fileSectionBuilder.AppendLine("")
    }

    [void]$fileSectionBuilder.AppendLine("````")
    [void]$fileSectionBuilder.AppendLine("")
    [void]$fileSectionBuilder.AppendLine("---")
    [void]$fileSectionBuilder.AppendLine("")

    $fileSection = $fileSectionBuilder.ToString()
    $estimatedCurrentBytes = [System.Text.Encoding]::UTF8.GetByteCount($currentBuilder.ToString())
    $estimatedSectionBytes = [System.Text.Encoding]::UTF8.GetByteCount($fileSection)

    # Save the current part before adding a section that would exceed the limit.
    if (
        $estimatedCurrentBytes -gt 0 -and
        ($estimatedCurrentBytes + $estimatedSectionBytes) -gt $maxOutputBytes
    ) {
        $partOutputPath = Get-PartOutputPath -PartNumber $currentPart -UseMultipleParts $true
        Write-Utf8File -Path $partOutputPath -Content $currentBuilder.ToString()
        $createdFiles.Add($partOutputPath)

        Write-Status "Created: $([System.IO.Path]::GetFileName($partOutputPath))" Green

        $currentPart++
        $currentBuilder = New-Object System.Text.StringBuilder
        Add-OutputPartMetadata -Builder $currentBuilder -PartNumber $currentPart
    }

    [void]$currentBuilder.Append($fileSection)
    $filesExported++

    Write-Progress `
        -Activity "Exporting project source" `
        -Status "$filesExported of $($includedFiles.Count): $relativePath" `
        -PercentComplete (($filesExported / $includedFiles.Count) * 100)
}

Write-Progress -Activity "Exporting project source" -Completed

# Write the final part.
if ($currentBuilder.Length -gt 0) {
    # If no earlier parts were created, keep the requested simple output filename.
    $useMultipleParts = $createdFiles.Count -gt 0

    $partOutputPath = Get-PartOutputPath `
        -PartNumber $currentPart `
        -UseMultipleParts $useMultipleParts

    Write-Utf8File -Path $partOutputPath -Content $currentBuilder.ToString()
    $createdFiles.Add($partOutputPath)

    Write-Status "Created: $([System.IO.Path]::GetFileName($partOutputPath))" Green
}

# If splitting occurred only after the first builder was written, all files already
# use numbered names. If only one file exists, it uses OutputFileName.
# This block keeps naming consistent in rare boundary cases.
if ($createdFiles.Count -gt 1) {
    $firstCreatedFile = $createdFiles[0]

    if ([System.IO.Path]::GetFileName($firstCreatedFile) -eq $OutputFileName) {
        $renamedFirstFile = Get-PartOutputPath -PartNumber 1 -UseMultipleParts $true
        Move-Item -LiteralPath $firstCreatedFile -Destination $renamedFirstFile -Force
        $createdFiles[0] = $renamedFirstFile
    }
}

# =============================================================================
# Summary
# =============================================================================

Write-Status "" Gray
Write-Status "============================================================" Cyan
Write-Status " Export completed successfully" Green
Write-Status "============================================================" Cyan
Write-Status "Files exported       : $filesExported" Gray
Write-Status "Output files created : $($createdFiles.Count)" Gray
Write-Status "" Gray


foreach ($createdFile in $createdFiles) {
    $createdFilePath = [string]$createdFile

    $createdFileInfo = Get-Item -LiteralPath $createdFilePath |
        Select-Object -First 1

    $fileLengthBytes = [double]$createdFileInfo.Length
    $sizeMB = [Math]::Round($fileLengthBytes / 1MB, 2)

    Write-Status "  $($createdFileInfo.FullName)" White
    Write-Status "  Size: $sizeMB MB" DarkGray
    Write-Host
}

if ($skippedLargeFiles.Count -gt 0) {
    Write-Status "Large files skipped: $($skippedLargeFiles.Count)" DarkYellow

    foreach ($largeFile in $skippedLargeFiles) {
        Write-Status "  - $largeFile" DarkYellow
    }

    Write-Status "" Gray
}

if ($skippedUnreadableFiles.Count -gt 0) {
    Write-Status "Unreadable files skipped: $($skippedUnreadableFiles.Count)" DarkYellow

    foreach ($unreadableFile in $skippedUnreadableFiles) {
        Write-Status "  - $unreadableFile" DarkYellow
    }

    Write-Status "" Gray
}

Write-Status "Security reminder:" Yellow
Write-Status "Before uploading, briefly inspect the generated Markdown file and" Yellow
Write-Status "make sure it does not contain passwords, tokens, connection strings," Yellow
Write-Status "tenant-specific secrets, personal information, or confidential data." Yellow
Write-Status "" Gray