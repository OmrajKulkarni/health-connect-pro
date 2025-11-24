import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, ArrowLeft, Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock available time slots
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  const handleBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }
    if (!reason.trim()) {
      toast.error("Please provide a reason for visit");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Appointment booked successfully! You'll receive a confirmation email.");
      navigate("/");
    }, 2000);
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
          <Button variant="ghost" onClick={() => navigate("/doctors")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Doctors
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Book Your Appointment</h2>
          <p className="text-muted-foreground">Choose your preferred date and time</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Select Date
              </CardTitle>
              <CardDescription>Choose an available date for your appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Time & Details */}
          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Select Time Slot
                </CardTitle>
                <CardDescription>Pick a convenient time for your visit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="text-xs"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Reason for Visit</CardTitle>
                <CardDescription>Briefly describe your health concern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="reason">Description *</Label>
                  <Textarea
                    id="reason"
                    placeholder="e.g., Regular checkup, chest pain, skin rash, etc."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Summary */}
        <Card className="mt-6 shadow-medium">
          <CardHeader>
            <CardTitle>Appointment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date:</span>
                <Badge variant="secondary">
                  {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : "Not selected"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Time:</span>
                <Badge variant="secondary">
                  {selectedTime || "Not selected"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Consultation Fee:</span>
                <span className="font-semibold text-foreground text-lg">$75</span>
              </div>
            </div>
            
            <Button
              variant="hero"
              size="lg"
              className="w-full mt-6"
              onClick={handleBooking}
              disabled={isLoading || !selectedDate || !selectedTime}
            >
              {isLoading ? "Booking..." : "Confirm Appointment"}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              You'll receive a confirmation email and SMS once the appointment is confirmed
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookAppointment;
