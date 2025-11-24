import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, MapPin, Star, Calendar, ArrowLeft, Search, DollarSign } from "lucide-react";

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: 15,
    region: "north",
    clinicName: "Heart Care Clinic",
    address: "123 Medical Plaza, North District",
    rating: 4.8,
    reviews: 120,
    consultationFee: 75,
    availability: "Available Today",
    qualifications: "MBBS, MD - Cardiology",
    about: "Specialized in heart diseases and cardiovascular health with over 15 years of experience."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    experience: 10,
    region: "south",
    clinicName: "Skin & Beauty Center",
    address: "456 Health Avenue, South District",
    rating: 4.9,
    reviews: 95,
    consultationFee: 60,
    availability: "Available Tomorrow",
    qualifications: "MBBS, MD - Dermatology",
    about: "Expert in skin conditions, cosmetic dermatology, and laser treatments."
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Pediatrics",
    experience: 12,
    region: "east",
    clinicName: "Children's Health Center",
    address: "789 Care Street, East District",
    rating: 5.0,
    reviews: 150,
    consultationFee: 50,
    availability: "Available Today",
    qualifications: "MBBS, DCH - Pediatrics",
    about: "Passionate about child healthcare, vaccinations, and developmental monitoring."
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    experience: 18,
    region: "west",
    clinicName: "Bone & Joint Institute",
    address: "321 Medical Center, West District",
    rating: 4.7,
    reviews: 88,
    consultationFee: 80,
    availability: "Available on Mon, Wed",
    qualifications: "MBBS, MS - Orthopedics",
    about: "Specializing in sports injuries, joint replacements, and spine surgeries."
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    specialty: "General Physician",
    experience: 8,
    region: "central",
    clinicName: "Family Wellness Clinic",
    address: "555 Community Road, Central District",
    rating: 4.6,
    reviews: 110,
    consultationFee: 40,
    availability: "Available Today",
    qualifications: "MBBS, MD - General Medicine",
    about: "Providing comprehensive primary care for all ages with a focus on preventive medicine."
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Neurology",
    experience: 20,
    region: "north",
    clinicName: "Brain & Nerve Center",
    address: "888 Neuroscience Blvd, North District",
    rating: 4.9,
    reviews: 75,
    consultationFee: 90,
    availability: "By Appointment",
    qualifications: "MBBS, DM - Neurology",
    about: "Expert in treating neurological disorders, migraines, and epilepsy."
  }
];

const DoctorsList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState(mockDoctors);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("disease") || "");
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get("region") || "");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    filterDoctors();
  }, [searchQuery, selectedRegion, sortBy]);

  const filterDoctors = () => {
    let filtered = [...mockDoctors];

    // Filter by search query (specialty)
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion && selectedRegion !== "all") {
      filtered = filtered.filter(doctor => doctor.region === selectedRegion);
    }

    // Sort
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "experience") {
      filtered.sort((a, b) => b.experience - a.experience);
    } else if (sortBy === "fee-low") {
      filtered.sort((a, b) => a.consultationFee - b.consultationFee);
    } else if (sortBy === "fee-high") {
      filtered.sort((a, b) => b.consultationFee - a.consultationFee);
    }

    setDoctors(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">HealthConnect</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle>Find Your Doctor</CardTitle>
            <CardDescription>Filter and sort to find the perfect healthcare professional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Specialty or Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="e.g., Cardiology"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="All regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="north">North Region</SelectItem>
                    <SelectItem value="south">South Region</SelectItem>
                    <SelectItem value="east">East Region</SelectItem>
                    <SelectItem value="west">West Region</SelectItem>
                    <SelectItem value="central">Central Region</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="fee-low">Lowest Fee</SelectItem>
                    <SelectItem value="fee-high">Highest Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{doctors.length}</span> doctors
          </p>
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          {doctors.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground text-lg">No doctors found matching your criteria.</p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedRegion("all"); }} className="mt-4">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-[1fr,auto] gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-foreground">{doctor.name}</h3>
                            <p className="text-muted-foreground">{doctor.qualifications}</p>
                          </div>
                          <Badge variant="secondary" className="text-sm">
                            {doctor.specialty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-semibold text-foreground">{doctor.rating}</span>
                            <span>({doctor.reviews} reviews)</span>
                          </div>
                          <span>•</span>
                          <span>{doctor.experience} years experience</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Stethoscope className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">{doctor.clinicName}</p>
                            <p className="text-sm text-muted-foreground">{doctor.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-sm capitalize">{doctor.region} Region</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground">{doctor.about}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-foreground">${doctor.consultationFee}</span>
                          <span className="text-sm text-muted-foreground">consultation fee</span>
                        </div>
                        <Badge variant={doctor.availability.includes("Today") ? "default" : "secondary"}>
                          {doctor.availability}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:min-w-[200px]">
                      <Button
                        variant="hero"
                        size="lg"
                        onClick={() => navigate(`/book-appointment/${doctor.id}`)}
                        className="w-full"
                      >
                        <Calendar className="h-5 w-5" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
