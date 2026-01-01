import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const DoctorRegister = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    clinicName: "",
    clinicAddress: "",
    region: "",
    consultation_fee: "",
    qualifications: "",
    about: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    setIsLoading(true);
    
    try {
      // Create auth user with doctor role
      const { data: authData, error: authError } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.name,
          phone: formData.phone,
          role: 'doctor'
        }
      );

      if (authError) throw authError;

      // Create doctor profile
      if (authData.user) {
        const { error: doctorError } = await supabase
          .from("doctors")
          .insert({
            user_id: authData.user.id,
            name: formData.name.startsWith("Dr.") ? formData.name : `Dr. ${formData.name}`,
            specialty: formData.specialty,
            experience: parseInt(formData.experience) || 0,
            region: formData.region,
            clinic_name: formData.clinicName,
            address: formData.clinicAddress,
            consultation_fee: parseInt(formData.consultation_fee) || 500,
            qualifications: formData.qualifications,
            about: formData.about || `Specialist in ${formData.specialty}`,
            phone: formData.phone,
            rating: 4.0,
            reviews: 0,
            availability: "Available Today"
          });

        if (doctorError) throw doctorError;
      }

      toast.success("Registration successful! Your profile is now visible to patients.");
      navigate("/doctors");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-strong">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Stethoscope className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl">Doctor Registration</CardTitle>
            <CardDescription>Join our network of healthcare professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Dr. John Doe"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty *</Label>
                    <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)}>
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Dermatology">Dermatology</SelectItem>
                        <SelectItem value="Neurology">Neurology</SelectItem>
                        <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="General Physician">General Physician</SelectItem>
                        <SelectItem value="Diabetes">Diabetes</SelectItem>
                        <SelectItem value="Cancer">Cancer</SelectItem>
                        <SelectItem value="Heart disease">Heart disease</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    placeholder="5"
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualifications">Qualifications *</Label>
                  <Input
                    id="qualifications"
                    placeholder="MBBS, MD - Cardiology"
                    value={formData.qualifications}
                    onChange={(e) => handleChange("qualifications", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Clinic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Clinic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Clinic Name *</Label>
                  <Input
                    id="clinicName"
                    placeholder="City Medical Center"
                    value={formData.clinicName}
                    onChange={(e) => handleChange("clinicName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinicAddress">Clinic Address *</Label>
                  <Textarea
                    id="clinicAddress"
                    placeholder="123 Main Street, Suite 100"
                    value={formData.clinicAddress}
                    onChange={(e) => handleChange("clinicAddress", e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">City *</Label>
                    <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="nagpur">Nagpur</SelectItem>
                        <SelectItem value="nashik">Nashik</SelectItem>
                        <SelectItem value="aurangabad">Aurangabad</SelectItem>
                        <SelectItem value="thane">Thane</SelectItem>
                        <SelectItem value="kolhapur">Kolhapur</SelectItem>
                        <SelectItem value="solapur">Solapur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultation_fee">Consultation Fee (₹) *</Label>
                    <Input
                      id="consultation_fee"
                      type="number"
                      min="0"
                      placeholder="500"
                      value={formData.consultation_fee}
                      onChange={(e) => handleChange("consultation_fee", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about">About You</Label>
                  <Textarea
                    id="about"
                    placeholder="Tell patients about yourself and your practice..."
                    value={formData.about}
                    onChange={(e) => handleChange("about", e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              {/* Account Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Account Security</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorRegister;
