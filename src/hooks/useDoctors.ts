import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Doctor } from "@/types/database";

export const useDoctors = (searchQuery?: string, region?: string, sortBy?: string) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, [searchQuery, region, sortBy]);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("doctors")
        .select("*");

      // Filter by search query
      if (searchQuery) {
        query = query.or(`specialty.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`);
      }

      // Filter by region
      if (region && region !== "all") {
        query = query.eq("region", region);
      }

      // Sort
      if (sortBy === "rating") {
        query = query.order("rating", { ascending: false });
      } else if (sortBy === "experience") {
        query = query.order("experience", { ascending: false });
      } else if (sortBy === "fee-low") {
        query = query.order("consultation_fee", { ascending: true });
      } else if (sortBy === "fee-high") {
        query = query.order("consultation_fee", { ascending: false });
      } else {
        query = query.order("rating", { ascending: false });
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setDoctors(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  return { doctors, loading, error, refetch: fetchDoctors };
};

export const useDoctorById = (doctorId: string | undefined) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const fetchDoctor = async () => {
    if (!doctorId) return;
    
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("doctors")
        .select("*")
        .eq("id", doctorId)
        .single();

      if (fetchError) throw fetchError;
      setDoctor(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch doctor");
    } finally {
      setLoading(false);
    }
  };

  return { doctor, loading, error };
};
