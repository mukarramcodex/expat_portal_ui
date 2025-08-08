import React, { useState } from 'react';
import { Upload, FileText, Building, Users, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ClinicRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    clinicName: '',
    registrationNumber: '',
    mohLicense: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Malaysia',
    contactPerson: '',
    designation: '',
    phone: '',
    email: '',
    website: '',
    services: [],
    capacity: '',
    operatingHours: '',
    description: ''
  });

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Clinic details and contact information' },
    { number: 2, title: 'Location & Services', description: 'Address and medical services offered' },
    { number: 3, title: 'Documentation', description: 'Upload required licenses and certificates' },
    { number: 4, title: 'Review & Submit', description: 'Review all information before submission' }
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  const malaysianStates = [
    'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Malacca', 'Negeri Sembilan',
    'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
  ];

  const medicalServices = [
    'General Health Screening',
    'Occupational Health Assessment',
    'X-Ray Services',
    'Blood Tests',
    'Urine Tests',
    'Vision Test',
    'Hearing Test',
    'Cardiovascular Screening',
    'Respiratory Assessment',
    'Vaccination Services'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="clinicName">Clinic Name *</Label>
          <Input
            id="clinicName"
            value={formData.clinicName}
            onChange={(e) => handleInputChange('clinicName', e.target.value)}
            placeholder="Enter clinic name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="registrationNumber">Business Registration Number *</Label>
          <Input
            id="registrationNumber"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            placeholder="Enter registration number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mohLicense">MOH License Number *</Label>
          <Input
            id="mohLicense"
            value={formData.mohLicense}
            onChange={(e) => handleInputChange('mohLicense', e.target.value)}
            placeholder="Enter MOH license number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Patient Capacity per Day</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => handleInputChange('capacity', e.target.value)}
            placeholder="Enter daily capacity"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person *</Label>
          <Input
            id="contactPerson"
            value={formData.contactPerson}
            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
            placeholder="Enter contact person name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            value={formData.designation}
            onChange={(e) => handleInputChange('designation', e.target.value)}
            placeholder="Enter designation"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+60"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email address"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website (Optional)</Label>
        <Input
          id="website"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          placeholder="https://"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter complete address"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Enter city"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {malaysianStates.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="postcode">Postcode *</Label>
          <Input
            id="postcode"
            value={formData.postcode}
            onChange={(e) => handleInputChange('postcode', e.target.value)}
            placeholder="Enter postcode"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Medical Services Offered *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {medicalServices.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={service}
                checked={formData.services.includes(service)}
                onChange={() => handleServiceToggle(service)}
                className="rounded border-gray-300"
              />
              <Label htmlFor={service} className="text-sm">{service}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="operatingHours">Operating Hours</Label>
        <Input
          id="operatingHours"
          value={formData.operatingHours}
          onChange={(e) => handleInputChange('operatingHours', e.target.value)}
          placeholder="e.g., Mon-Fri: 8:00 AM - 6:00 PM"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Additional Information</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Any additional information about your clinic"
          rows={4}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          Please upload the following documents in PDF or image format (max 10MB each):
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">MOH License Certificate *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
              <Button variant="outline" className="mt-4">
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Registration Certificate *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
              <Button variant="outline" className="mt-4">
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Facility Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Upload photos of your clinic facilities
              </p>
              <p className="text-xs text-gray-500">Multiple files allowed</p>
              <Button variant="outline" className="mt-4">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Equipment Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Upload medical equipment certificates
              </p>
              <p className="text-xs text-gray-500">X-Ray, lab equipment, etc.</p>
              <Button variant="outline" className="mt-4">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <Alert>
        <Building className="h-4 w-4" />
        <AlertDescription>
          Please review all information carefully before submitting your clinic registration.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Clinic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Clinic Name:</span>
              <span className="text-sm font-medium">{formData.clinicName || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Registration Number:</span>
              <span className="text-sm font-medium">{formData.registrationNumber || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">MOH License:</span>
              <span className="text-sm font-medium">{formData.mohLicense || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Daily Capacity:</span>
              <span className="text-sm font-medium">{formData.capacity || 'Not provided'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Contact Person:</span>
              <span className="text-sm font-medium">{formData.contactPerson || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Phone:</span>
              <span className="text-sm font-medium">{formData.phone || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="text-sm font-medium">{formData.email || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">State:</span>
              <span className="text-sm font-medium">{formData.state || 'Not provided'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Services Offered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {formData.services.length > 0 ? (
              formData.services.map((service) => (
                <Badge key={service} variant="secondary">{service}</Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No services selected</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinic Registration</h1>
          <p className="text-muted-foreground">Register your medical clinic with EWIP</p>
        </div>
        <Badge variant="outline">Step {currentStep} of {steps.length}</Badge>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Registration Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Steps Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step) => (
          <Card key={step.number} className={`cursor-pointer transition-colors ${
            step.number === currentStep 
              ? 'border-primary bg-primary/5' 
              : step.number < currentStep 
                ? 'border-green-200 bg-green-50' 
                : 'border-border'
          }`}>
            <CardContent className="p-4 text-center">
              <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                step.number === currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : step.number < currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {step.number < currentStep ? '✓' : step.number}
              </div>
              <h3 className="font-medium text-sm">{step.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          {currentStep < steps.length ? (
            <Button onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}>
              Next
            </Button>
          ) : (
            <Button>Submit Registration</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicRegistration;