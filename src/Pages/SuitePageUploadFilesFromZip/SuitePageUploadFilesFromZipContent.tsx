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
import { useMemo, useState } from "react"
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
  const handleClose = () => navigate("./..")

  const { stepCount, currentStep, handleBack, handleNext, canContinue } =
    useSteps()

  return (
    <Dialog open={true} fullWidth={true} maxWidth={"md"} onClose={handleClose}>
      <DialogTitle>Enviar Arquivo Compactado</DialogTitle>

      <Divider sx={{ mb: 0.5 }} />

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Divider sx={{ my: 2 }} />

        {currentStep === 0 && <StepSelectFiles />}
        {currentStep === 1 && <StepFilterContent />}

        <Divider sx={{ my: 2 }} />
      </DialogContent>

      <DialogActions>
        <Box sx={{ flex: 1 }}>
          <Button onClick={handleClose}>Cancelar</Button>
        </Box>

        <Button disabled={currentStep === 0} onClick={handleBack}>
          Anterior
        </Button>

        {currentStep < stepCount - 1 && (
          <Button disabled={!canContinue} onClick={handleNext}>
            Próximo
          </Button>
        )}

        {currentStep === stepCount - 1 && <SuitePageUploadFilesFromZipSubmit />}
      </DialogActions>
    </Dialog>
  )
}

export default SuitePageUploadFilesFromZipContent
