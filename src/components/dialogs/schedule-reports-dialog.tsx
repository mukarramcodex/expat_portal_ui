import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Mail, Download } from "lucide-react"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface ScheduleReportsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reportType?: string
}

export function ScheduleReportsDialog({ open, onOpenChange, reportType }: ScheduleReportsDialogProps) {
  const [reportName, setReportName] = useState("")
  const [selectedReport, setSelectedReport] = useState(reportType || "")
  const [frequency, setFrequency] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [outputFormat, setOutputFormat] = useState("pdf")
  const [recipients, setRecipients] = useState<string[]>([])
  const [newRecipient, setNewRecipient] = useState("")
  const [filters, setFilters] = useState<string[]>([])

  const reportTypes = [
    { value: "worker_summary", label: "Worker Summary Report" },
    { value: "clinic_performance", label: "Clinic Performance Report" },
    { value: "training_analytics", label: "Training Analytics Report" },
    { value: "approval_status", label: "Approval Status Report" },
    { value: "payment_verification", label: "Payment Verification Report" },
    { value: "system_integration", label: "System Integration Report" },
    { value: "audit_trail", label: "Audit Trail Report" },
    { value: "compliance_dashboard", label: "Compliance Dashboard" }
  ]

  const frequencies = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "custom", label: "Custom Schedule" }
  ]

  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", 
    "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00"
  ]

  const availableFilters = [
    "Active Workers Only",
    "Approved Clinics Only", 
    "Pending Approvals",
    "Last 30 Days",
    "Current Month",
    "Include Financial Data",
    "Exclude Test Data"
  ]

  const addRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient])
      setNewRecipient("")
    }
  }

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r !== email))
  }

  const handleFilterChange = (filter: string, checked: boolean) => {
    if (checked) {
      setFilters([...filters, filter])
    } else {
      setFilters(filters.filter(f => f !== filter))
    }
  }

  const handleSubmit = () => {
    // Handle report scheduling
    console.log({ 
      reportName,
      selectedReport,
      frequency,
      startDate,
      time,
      format: outputFormat,
      recipients,
      filters
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Automated Report</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Report Configuration */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Report Configuration</h3>
            
            <div className="space-y-2">
              <Label htmlFor="reportName">Report Name</Label>
              <Input 
                id="reportName"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Enter custom report name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel (XLSX)</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Schedule Settings */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Schedule Settings</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map(freq => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>
                        {slot}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {frequency === "custom" && (
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
            )}
          </div>

          {/* Recipients */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Email Recipients</h3>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Enter email address"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
              />
              <Button onClick={addRecipient} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            {recipients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recipients.map((email) => (
                  <Badge key={email} variant="secondary" className="pr-1">
                    {email}
                    <button
                      onClick={() => removeRecipient(email)}
                      className="ml-1 text-xs hover:bg-red-100 rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Report Filters</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableFilters.map((filter) => (
                <div key={filter} className="flex items-center space-x-2">
                  <Checkbox
                    id={filter}
                    checked={filters.includes(filter)}
                    onCheckedChange={(checked) => 
                      handleFilterChange(filter, checked as boolean)
                    }
                  />
                  <Label htmlFor={filter} className="text-sm">
                    {filter}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          {selectedReport && frequency && (
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-2">Schedule Preview</h4>
              <div className="text-sm space-y-1">
                <p><strong>Report:</strong> {reportTypes.find(r => r.value === selectedReport)?.label}</p>
                <p><strong>Frequency:</strong> {frequencies.find(f => f.value === frequency)?.label}</p>
                {time && <p><strong>Time:</strong> {time}:00</p>}
                <p><strong>Recipients:</strong> {recipients.length} email(s)</p>
                <p><strong>Format:</strong> {outputFormat.toUpperCase()}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedReport || !frequency || recipients.length === 0}
          >
            <Clock className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}