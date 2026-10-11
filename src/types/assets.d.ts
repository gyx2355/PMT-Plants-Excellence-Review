declare module '*.pptx?url' {
  const url: string
  export default url
}

declare module '*.pptx?inline' {
  const dataUrl: string
  export default dataUrl
}