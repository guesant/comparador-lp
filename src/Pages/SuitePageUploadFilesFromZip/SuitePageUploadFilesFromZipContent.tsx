import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

import Divider from "@mui/material/Divider"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Stepper from "@mui/material/Stepper"
import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContextSelector } from "use-context-selector"
import StepFilterContent from "./StepFilterContent/StepFilterContent"
import StepSelectFiles from "./StepSelectFiles/StepSelectFiles"
import { SuitePageUploadFilesFromZipContext } from "./SuitePageUploadFilesFromZipContext"
import { SuitePageUploadFilesFromZipSubmit } from "./SuitePageUploadFilesFromZipSubmit"

const steps = ["Selecionar Arquivos", "Filtrar Conteúdo"]

const useSteps = () => {
  const stepCount = 2
  const [currentStep, setCurrentStep] = useState(0)

  const selectedFilesCount = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ selectedFiles }) => selectedFiles.length
  )

  const handleBack = () => {
    setCurrentStep((currentStep) => Math.max(0, currentStep - 1))
  }

  const handleNext = () => {
    setCurrentStep((currentStep) => Math.min(stepCount - 1, currentStep + 1))
  }

  const canContinue = useMemo(() => {
    if (currentStep === 0) {
      return selectedFilesCount > 0
    }
    return false
  }, [currentStep, selectedFilesCount])

  return { stepCount, currentStep, handleBack, handleNext, canContinue }
}

const SuitePageUploadFilesFromZipContent = () => {
  const navigate = useNavigate()

  const isBusy = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ isBusy }) => isBusy
  )

  const handleClose = useCallback(
    () => !isBusy && navigate("./.."),
    [isBusy, navigate]
  )

  const { stepCount, currentStep, handleBack, handleNext, canContinue } =
    useSteps()

  return (
    <Dialog
      open={true}
      fullWidth={true}
      maxWidth={"lg"}
      PaperProps={{ sx: { height: "90vh" } }}
      onClose={handleClose}
    >
      <DialogTitle>Enviar Arquivo Compactado</DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          py: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        <Box sx={{ my: 2 }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Divider />

        <Box sx={{ my: 2, flex: "1 1", overflow: "hidden", display: "flex" }}>
          {currentStep === 0 && <StepSelectFiles />}
          {currentStep === 1 && <StepFilterContent />}
        </Box>
      </DialogContent>
      <Divider />

      <DialogActions>
        <Box sx={{ flex: 1 }}>
          <Button disabled={isBusy} onClick={handleClose}>
            Cancelar
          </Button>
        </Box>

        <Button disabled={isBusy || currentStep === 0} onClick={handleBack}>
          Anterior
        </Button>

        {currentStep < stepCount - 1 && (
          <Button disabled={isBusy || !canContinue} onClick={handleNext}>
            Próximo
          </Button>
        )}

        {currentStep === stepCount - 1 && <SuitePageUploadFilesFromZipSubmit />}
      </DialogActions>
    </Dialog>
  )
}

export default SuitePageUploadFilesFromZipContent
