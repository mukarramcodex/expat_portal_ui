import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"

interface ScheduleTrainingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workers?: any[]
}

export function ScheduleTrainingDialog({ open, onOpenChange, workers = [] }: ScheduleTrainingDialogProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [trainingCenter, setTrainingCenter] = useState("")
  const [program, setProgram] = useState("")
  const [instructor, setInstructor] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const trainingPrograms = [
    "Construction Safety Orientation",
    "Basic Construction Skills",
    "Electrical Safety Training",
    "Heavy Equipment Operation",
    "First Aid & Emergency Response",
    "Quality Control & Standards",
    "Environmental Safety",
    "Communication Skills"
  ]

  const timeSlots = [
    "08:00 AM - 12:00 PM",
    "01:00 PM - 05:00 PM", 
    "08:00 AM - 05:00 PM (Full Day)",
    "06:00 PM - 09:00 PM (Evening)"
  ]

  const handleWorkerSelection = (workerId: string, checked: boolean) => {
    if (checked) {
      setSelectedWorkers([...selectedWorkers, workerId])
    } else {
      setSelectedWorkers(selectedWorkers.filter(id => id !== workerId))
    }
  }

  const handleSubmit = () => {
    // Handle training scheduling
    console.log({ 
      startDate, 
      endDate, 
      trainingCenter, 
      program, 
      instructor, 
      timeSlot,
      selectedWorkers, 
      notes 
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Training Session</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Training Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Training Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trainingCenter">Training Center</Label>
                <Select value={trainingCenter} onValueChange={setTrainingCenter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select training center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tc1">CIDB Training Center KL</SelectItem>
                    <SelectItem value="tc2">Malaysia Safety Institute</SelectItem>
                    <SelectItem value="tc3">Industrial Skills Training Center</SelectItem>
                    <SelectItem value="tc4">Construction Academy Malaysia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Training Program</Label>
                <Select value={program} onValueChange={setProgram}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainingPrograms.map(prog => (
                      <SelectItem key={prog} value={prog}>{prog}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Select value={instructor} onValueChange={setInstructor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inst1">Ahmad Rahman</SelectItem>
                    <SelectItem value="inst2">Sarah Johnson</SelectItem>
                    <SelectItem value="inst3">Dr. Lim Wei Ming</SelectItem>
                    <SelectItem value="inst4">Maria Santos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot">Time Slot</Label>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Schedule</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Worker Selection */}
          {workers.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-base">Select Workers</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedWorkers(workers.map(w => w.id))}
                >
                  Select All
                </Button>
              </div>
              
              <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                {workers.map((worker) => (
                  <div key={worker.id} className="flex items-center space-x-2 py-1">
                    <Checkbox
                      id={worker.id}
                      checked={selectedWorkers.includes(worker.id)}
                      onCheckedChange={(checked) => 
                        handleWorkerSelection(worker.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={worker.id} className="text-sm flex-1">
                      {worker.name} - {worker.passport}
                    </Label>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {selectedWorkers.length} of {workers.length} workers selected
              </p>
            </div>
          )}

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Enter any special requirements or notes for the training session"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Schedule Training
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}