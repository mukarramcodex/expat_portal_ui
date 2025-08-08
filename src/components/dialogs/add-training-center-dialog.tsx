import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface AddTrainingCenterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTrainingCenterDialog({ open, onOpenChange }: AddTrainingCenterDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    capacity: "",
    type: "",
    accreditation: "",
    description: ""
  })
  
  const [trainingPrograms, setTrainingPrograms] = useState<string[]>([])

  const availablePrograms = [
    "Construction Safety",
    "Electrical Safety",
    "Machine Operation",
    "First Aid & CPR",
    "Fire Safety",
    "Chemical Handling",
    "Height Work Safety",
    "Personal Protective Equipment"
  ]

  const malaysianStates = [
    "Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Labuan",
    "Malacca", "Negeri Sembilan", "Pahang", "Penang", "Perak",
    "Perlis", "Putrajaya", "Sabah", "Sarawak", "Selangor", "Terengganu"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleProgramChange = (program: string, checked: boolean) => {
    if (checked) {
      setTrainingPrograms([...trainingPrograms, program])
    } else {
      setTrainingPrograms(trainingPrograms.filter(p => p !== program))
    }
  }

  const handleSubmit = () => {
    // Handle training center creation
    console.log({ ...formData, trainingPrograms })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Training Center</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Center Name</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter training center name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input 
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                  placeholder="TC-XXXX-XXXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="center@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+60 3-XXXX XXXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Center Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public Training Center</SelectItem>
                    <SelectItem value="private">Private Training Center</SelectItem>
                    <SelectItem value="corporate">Corporate Training Center</SelectItem>
                    <SelectItem value="specialized">Specialized Training Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input 
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange("capacity", e.target.value)}
                  placeholder="Maximum trainees"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Address Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter full address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {malaysianStates.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input 
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  placeholder="XXXXX"
                />
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Contact Person</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Full Name</Label>
                <Input 
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  placeholder="Contact person name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input 
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  placeholder="+60 1X-XXX XXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input 
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  placeholder="contact@example.com"
                />
              </div>
            </div>
          </div>

          {/* Training Programs */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Training Programs Offered</h3>
            <div className="grid grid-cols-2 gap-2">
              {availablePrograms.map((program) => (
                <div key={program} className="flex items-center space-x-2">
                  <Checkbox
                    id={program}
                    checked={trainingPrograms.includes(program)}
                    onCheckedChange={(checked) => 
                      handleProgramChange(program, checked as boolean)
                    }
                  />
                  <Label htmlFor={program} className="text-sm">
                    {program}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accreditation">Accreditation</Label>
              <Input 
                id="accreditation"
                value={formData.accreditation}
                onChange={(e) => handleInputChange("accreditation", e.target.value)}
                placeholder="ISO, CIDB, or other certifications"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the training center"
                rows={3}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Training Center
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}