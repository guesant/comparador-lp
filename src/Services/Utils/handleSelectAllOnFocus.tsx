import { FocusEvent } from "react"

export const handleSelectAllOnFocus = (
  e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
) => e.target.select()
