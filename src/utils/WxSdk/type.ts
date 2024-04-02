export type OpenFileParams = {
  fileUrl: string
  fileType?: "doc" | "docx" | "xls" | "xlsx" | "ppt" | "pptx" | "pdf" | "txt" | 'png' | 'jpeg' | 'jpg'
}
export type NavigateToMiniProgramParams = {
  appId: string
  path: string
  extraData: object
  envVersion: 'release' | 'develop' | 'trial'
}
