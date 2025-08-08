import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"

interface ScheduleAuditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clinic?: any
}

export function ScheduleAuditDialog({ open, onOpenChange, clinic }: ScheduleAuditDialogProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [auditor, setAuditor] = useState("")
  const [auditType, setAuditType] = useState("")
  const [requirements, setRequirements] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const auditRequirements = [
    "MOH License Verification",
    "Equipment Inspection", 
    "Staff Qualification Review",
    "Facility Compliance Check",
    "Document Audit",
    "Safety Protocol Review"
  ]

  const handleRequirementChange = (requirement: string, checked: boolean) => {
    if (checked) {
      setRequirements([...requirements, requirement])
    } else {
      setRequirements(requirements.filter(r => r !== requirement))
    }
  }

  const handleSubmit = () => {
    // Handle audit scheduling
    console.log({ clinic, date, time, auditor, auditType, requirements, notes })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Clinic Audit</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="clinic">Clinic</Label>
            <Input 
              id="clinic" 
              value={clinic?.name || ""} 
              disabled 
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="auditType">Audit Type</Label>
            <Select value={auditType} onValueChange={setAuditType}>
              <SelectTrigger>
                <SelectValue placeholder="Select audit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="initial">Initial Audit</SelectItem>
                <SelectItem value="renewal">Renewal Audit</SelectItem>
                <SelectItem value="compliance">Compliance Audit</SelectItem>
                <SelectItem value="followup">Follow-up Audit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Audit Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="16:00">04:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="auditor">Assigned Auditor</Label>
            <Select value={auditor} onValueChange={setAuditor}>
              <SelectTrigger>
                <SelectValue placeholder="Select auditor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auditor1">Sarah Johnson</SelectItem>
                <SelectItem value="auditor2">Mike Chen</SelectItem>
                <SelectItem value="auditor3">Dr. Priya Sharma</SelectItem>
                <SelectItem value="auditor4">James Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Audit Requirements</Label>
            <div className="grid grid-cols-2 gap-2">
              {auditRequirements.map((requirement) => (
                <div key={requirement} className="flex items-center space-x-2">
                  <Checkbox
                    id={requirement}
                    checked={requirements.includes(requirement)}
                    onCheckedChange={(checked) => 
                      handleRequirementChange(requirement, checked as boolean)
                    }
                  />
                  <Label htmlFor={requirement} className="text-sm">
                    {requirement}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Enter any special instructions or notes for the audit"
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
            Schedule Audit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}