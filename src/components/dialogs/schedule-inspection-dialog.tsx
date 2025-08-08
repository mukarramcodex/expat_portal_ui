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

interface ScheduleInspectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clinic?: any
}

export function ScheduleInspectionDialog({ open, onOpenChange, clinic }: ScheduleInspectionDialogProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [inspector, setInspector] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    // Handle inspection scheduling
    console.log({ clinic, date, time, inspector, notes })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Physical Inspection</DialogTitle>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Inspection Date</Label>
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
            <Label htmlFor="inspector">Assigned Inspector</Label>
            <Select value={inspector} onValueChange={setInspector}>
              <SelectTrigger>
                <SelectValue placeholder="Select inspector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inspector1">Dr. Ahmad Rahman</SelectItem>
                <SelectItem value="inspector2">Dr. Lim Wei Ming</SelectItem>
                <SelectItem value="inspector3">Dr. Siti Nurhaliza</SelectItem>
                <SelectItem value="inspector4">Dr. Raj Kumar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Enter any special instructions or notes for the inspection"
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
            Schedule Inspection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}