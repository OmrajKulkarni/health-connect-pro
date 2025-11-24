import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Stethoscope, Calendar, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [searchDisease, setSearchDisease] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleSearch = () => {
    if (searchDisease || selectedRegion) {
      navigate(`/doctors?disease=${searchDisease}&region=${selectedRegion}`);
    }
  };

  const features = [
    {
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      title: "Expert Doctors",
      description: "Connect with verified medical professionals in your area"
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Easy Booking",
      description: "Schedule appointments instantly with just a few clicks"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Save Time",
      description: "No more waiting in long queues or phone calls"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Patient Reviews",
      description: "Read real reviews from patients like you"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">HealthConnect</h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/patient-auth")}>
              Patient Login
            </Button>
            <Button variant="outline" onClick={() => navigate("/doctor-register")}>
              For Doctors
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background z-0" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-foreground leading-tight">
                Find Your Doctor,<br />
                <span className="text-primary">Book Instantly</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Connect with trusted healthcare professionals in your area. Quick appointments, verified doctors, and quality care.
              </p>
              
              {/* Search Card */}
              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="text-lg">Search for Doctors</CardTitle>
                  <CardDescription>Find specialists based on your needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Disease or Specialty</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g., Cardiology, Diabetes, Skin problems..."
                        value={searchDisease}
                        onChange={(e) => setSearchDisease(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select your city" />
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
                  </div>
                  
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    onClick={handleSearch}
                  >
                    <Search className="h-5 w-5" />
                    Search Doctors
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative hidden md:block">
              <div className="rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src={heroImage} 
                  alt="Healthcare professionals" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose HealthConnect?</h3>
            <p className="text-muted-foreground text-lg">Your health, our priority</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-strong">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Are You a Doctor?</CardTitle>
              <CardDescription className="text-primary-foreground/90 text-lg">
                Join our platform and reach thousands of patients
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-background text-primary hover:bg-background/90 border-0"
                onClick={() => navigate("/doctor-register")}
              >
                Register Your Clinic
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 HealthConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
