import { useState, useMemo, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { MapPin, Utensils, Building2, Navigation, Bike, Filter, Clock, Activity, Target, ArrowLeft, CheckCircle } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF, DirectionsRenderer } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'motion/react';

type MapMode = "restaurant" | "ngo" | "volunteer";

interface MarkerData {
  id: string;
  type: "restaurant" | "ngo" | "volunteer" | "food";
  name: string;
  location: string;
  lat: number;
  lng: number;
  details?: string;
  urgency?: "low" | "medium" | "high";
  status?: "pending" | "accepted";
}

// --- REUSABLE COMPONENT: InfoPanel ---
function InfoPanel({ 
  mode, 
  selectedMarker, 
  deliveryStatus, 
  eta, 
  handleStartDelivery,
  handleAcceptRequest,
  handleGetDirections,
  navigate
}: any) {
  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case "high": return "bg-red-500 border-red-500 text-red-500 shadow-red-500/50";
      case "medium": return "bg-yellow-500 border-yellow-500 text-yellow-500 shadow-yellow-500/50";
      case "low": return "bg-green-500 border-green-500 text-green-500 shadow-green-500/50";
      default: return "bg-primary border-primary text-primary shadow-primary/50";
    }
  };

  const getMarkerIcon = (type: string, urgency?: string) => {
    if (type === "food") return <Utensils className={`w-5 h-5 ${getUrgencyColor(urgency).replace(/bg-|border-|shadow-/g, 'text-').split(' ')[0]}`} />;
    if (type === "ngo") return <Building2 className="w-5 h-5 text-secondary" />;
    if (type === "volunteer") return <Bike className="w-5 h-5 text-blue-500" />;
    return <MapPin className="w-5 h-5 text-primary" />;
  };

  const getMarkerStyle = (type: string, urgency?: string) => {
    if (type === "food") {
      if (urgency === 'high') return "bg-red-500/20 border-2 border-red-500 group-hover:bg-red-500/30 shadow-lg shadow-red-500/20";
      if (urgency === 'medium') return "bg-yellow-500/20 border-2 border-yellow-500 group-hover:bg-yellow-500/30 shadow-lg shadow-yellow-500/20";
      return "bg-green-500/20 border-2 border-green-500 group-hover:bg-green-500/30 shadow-lg shadow-green-500/20";
    }
    if (type === "ngo") return "bg-secondary/20 border-2 border-secondary shadow-lg shadow-secondary/20";
    if (type === "volunteer") return "bg-blue-500/20 border-2 border-blue-500 shadow-lg shadow-blue-500/20";
    return "bg-primary/20 border-2 border-primary";
  };

  return (
    <div className="w-96 bg-card/80 backdrop-blur-xl border-r border-border flex flex-col shadow-2xl z-10">
      <div className="p-6 border-b border-border/50 bg-background/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-heading">Map Center</h2>
          <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-foreground" onClick={() => navigate(`/${mode}/dashboard`)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>
        <p className="text-sm text-foreground/60 font-light">
          {mode === 'restaurant' && "Locate nearby NGOs and available volunteers to distribute your surplus."}
          {mode === 'ngo' && "Find available food donations. Urgency is indicated by color (Red = High)."}
          {mode === 'volunteer' && "View active delivery routes from restaurants to NGOs."}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <AnimatePresence mode="wait">
          {selectedMarker ? (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-card to-muted border-border shadow-lg">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${getMarkerStyle(selectedMarker.type, selectedMarker.urgency)}`}>
                    {getMarkerIcon(selectedMarker.type, selectedMarker.urgency)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs capitalize font-medium">
                        {selectedMarker.type === 'food' ? 'Food Donation' : selectedMarker.type}
                      </Badge>
                      {selectedMarker.status === 'accepted' && (
                        <Badge variant="outline" className="text-xs bg-green-500/20 text-green-500 border-green-500">Accepted</Badge>
                      )}
                    </div>
                    <h4 className="font-bold font-heading text-lg leading-tight">{selectedMarker.name}</h4>
                    <div className="flex items-center gap-1.5 text-sm text-foreground/60 mt-2 font-light">
                      <MapPin className="w-3.5 h-3.5" /> {selectedMarker.location}
                    </div>
                  </div>
                </div>

                {selectedMarker.details && (
                  <div className="mt-5 pt-5 border-t border-border/50">
                    <p className="text-sm leading-relaxed text-foreground/80 font-light">{selectedMarker.details}</p>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3">
                  {/* Common Routing feature */}
                  <Button onClick={handleGetDirections} variant="secondary" className="w-full font-medium shadow-lg hover:bg-secondary/80">
                    <Navigation className="w-4 h-4 mr-2" /> Get Real Directions
                  </Button>

                  {/* Accept Request flow */}
                  {mode === 'volunteer' && selectedMarker.type === 'food' && selectedMarker.status !== 'accepted' && (
                    <Button onClick={() => handleAcceptRequest(selectedMarker.id)} className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                      <CheckCircle className="w-4 h-4 mr-2" /> Accept Request
                    </Button>
                  )}
                  {mode === 'volunteer' && selectedMarker.status === 'accepted' && deliveryStatus === "pending" && (
                    <Button onClick={handleStartDelivery} className="w-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20">
                      Start Delivery Navigation
                    </Button>
                  )}
                  
                  {/* Delivery Status Visuals */}
                  {mode === 'volunteer' && deliveryStatus === "on-the-way" && (
                     <div className="glass p-4 rounded-xl text-center space-y-2 border-primary/50">
                        <p className="font-bold text-lg text-primary">Navigating to NGO...</p>
                        <p className="text-sm font-light">ETA: {eta} minutes</p>
                        <p className="text-xs text-foreground/50">Turn-by-turn routing active</p>
                     </div>
                  )}
                  {deliveryStatus === "delivered" && (
                     <div className="glass p-4 rounded-xl text-center border-green-500/50 bg-green-500/10">
                        <p className="font-bold text-xl text-green-500">Delivered Successfully! 🎉</p>
                     </div>
                  )}

                  {/* NGO Claim Flow */}
                  {selectedMarker.type === "food" && mode === 'ngo' && (
                    <div className="space-y-3">
                      <Button onClick={() => handleAcceptRequest(selectedMarker.id)} variant="outline" className="w-full font-medium hover:bg-primary hover:text-white">
                        Claim Donation & Assign Volunteer
                      </Button>
                      {deliveryStatus === "on-the-way" && (
                         <Card className="p-4 border-primary/30 bg-primary/5">
                            <h4 className="text-sm font-bold flex items-center gap-2 mb-2 text-primary">
                              <Activity className="w-4 h-4 animate-pulse" /> Incoming Delivery
                            </h4>
                            <div className="space-y-2">
                              <p className="text-sm">Status: <span className="font-semibold capitalize text-foreground">{deliveryStatus.replace("-", " ")}</span></p>
                              <p className="text-sm">ETA: <span className="font-semibold text-foreground">{eta} min</span></p>
                              <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                                <motion.div className="bg-primary h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${Math.min(100, (15 - eta) / 15 * 100)}%` }} />
                              </div>
                            </div>
                         </Card>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center space-y-4 text-foreground/40 mt-20">
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center mb-2 shadow-inner">
                <Target className="w-10 h-10 text-foreground/20" />
              </div>
              <p className="font-medium text-foreground/60">No location selected</p>
              <p className="text-sm font-light px-8">Click on any marker on the map to view details and available actions.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENT: CustomMarker ---
function CustomMarker({ marker, onClick }: { marker: MarkerData, onClick: () => void }) {
  const getMarkerColor = () => {
    if (marker.status === 'accepted') return "#3b82f6"; // Accepted turns blue
    if (marker.type === 'food') return marker.urgency === 'high' ? "#ef4444" : "#22c55e"; // Red/Green for food
    if (marker.type === 'ngo') return "#8b5cf6"; // Purple for NGO
    return "#3b82f6"; // Blue for volunteer
  };

  return (
    <MarkerF
      position={{ lat: marker.lat, lng: marker.lng }}
      onClick={onClick}
      icon={{
        path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
        scale: marker.status === 'accepted' ? 10 : 8,
        fillColor: getMarkerColor(),
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      }}
    />
  );
}

// --- MAIN PAGE COMPONENT: MapView ---
export function MapView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract role
  const roleMatch = location.pathname.match(/\/(restaurant|ngo|volunteer)/);
  const mode: MapMode = roleMatch ? (roleMatch[1] as MapMode) : "ngo";

  // State Management
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([
    { id: "1", type: "food", name: "Fresh Vegetables", location: "Green Garden Restaurant", lat: 40.7128, lng: -74.006, details: "5kg of fresh vegetables.", urgency: "high", status: "pending" },
    { id: "2", type: "ngo", name: "Food Rescue NGO", location: "123 Main Street", lat: 40.7308, lng: -73.9973, details: "Accepting donations 24/7." },
    { id: "3", type: "food", name: "Cooked Meals", location: "City Bistro", lat: 40.7489, lng: -73.9681, details: "20 portions ready.", urgency: "medium", status: "pending" }
  ]);
  
  const [deliveryStatus, setDeliveryStatus] = useState<"pending" | "picked-up" | "on-the-way" | "delivered">("pending");
  const [eta, setEta] = useState(15);
  const [volunteerPos, setVolunteerPos] = useState({ lat: 40.7128, lng: -74.006 });
  const [mapAuthError, setMapAuthError] = useState(false);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  // Hardcoded coordinates for route simulation
  const restaurantPos = { lat: 40.7128, lng: -74.006 };
  const ngoPos = { lat: 40.7308, lng: -73.9973 };

  // Google Maps Load Config
  useEffect(() => {
    (window as any).gm_authFailure = () => setMapAuthError(true);
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "" });

  // Map Filter Logic
  const displayMarkers = markers.filter(m => (mode === 'restaurant' ? (m.type === 'ngo' || m.type === 'volunteer') : mode === 'ngo' ? (m.type === 'food' || m.type === 'volunteer') : true));

  // Request Acceptance Flow
  const handleAcceptRequest = (id: string) => {
    setMarkers(prev => prev.map(m => m.id === id ? { ...m, status: 'accepted' } : m));
    if (selectedMarker?.id === id) {
      setSelectedMarker({ ...selectedMarker, status: 'accepted' });
    }
    import('sonner').then(({ toast }) => toast.success("Request accepted successfully!"));
  };

  // Google Maps Directions Services Component Flow
  const handleGetDirections = useCallback(() => {
    if (!window.google || !selectedMarker) return;
    
    // Fallback Mock User Pos
    const origin = (mode === 'volunteer') ? volunteerPos : restaurantPos;
    
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: { lat: selectedMarker.lat, lng: selectedMarker.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const computedEta = result?.routes[0]?.legs[0]?.duration?.text || "Unknown";
          import('sonner').then(({ toast }) => toast.success(`Route calculated! ETA: ${computedEta}`));
        } else {
          import('sonner').then(({ toast }) => toast.error("Could not calculate directions with free API key."));
        }
      }
    );
  }, [selectedMarker, mode, volunteerPos, restaurantPos]);

  // Live Tracking Sync Flow
  useEffect(() => {
    if (deliveryStatus === "on-the-way") {
      const interval = setInterval(() => {
        setVolunteerPos(prev => {
          const latDiff = ngoPos.lat - prev.lat;
          const lngDiff = ngoPos.lng - prev.lng;
          const dist = Math.sqrt(latDiff*latDiff + lngDiff*lngDiff);
          if (dist < 0.001) {
            setDeliveryStatus("delivered");
            setEta(0);
            clearInterval(interval);
            import('sonner').then(({ toast }) => toast.success("Delivery completed!"));
            return ngoPos;
          }
          if (eta > 1) setEta(e => e - 1);
          return { lat: prev.lat + latDiff * 0.1, lng: prev.lng + lngDiff * 0.1 };
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [deliveryStatus]);

  const mapCenter = useMemo(() => {
    if (deliveryStatus === "on-the-way") return volunteerPos;
    if (selectedMarker) return { lat: selectedMarker.lat, lng: selectedMarker.lng };
    return { lat: 40.7128, lng: -74.006 };
  }, [volunteerPos, selectedMarker, deliveryStatus]);

  return (
    <div className="h-full flex flex-col bg-background text-foreground overflow-hidden">
      <div className="flex-1 flex">
        {/* Modular Left Info Panel */}
        <InfoPanel 
          mode={mode} 
          selectedMarker={selectedMarker} 
          deliveryStatus={deliveryStatus} 
          eta={eta} 
          handleStartDelivery={() => { setDeliveryStatus("on-the-way"); setEta(15); }}
          handleAcceptRequest={handleAcceptRequest}
          handleGetDirections={handleGetDirections}
          navigate={navigate} 
        />

        {/* Modular Right Map Area */}
        <div className="flex-1 relative bg-muted/20 overflow-hidden">
          {loadError || mapAuthError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-background text-center">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-heading mb-2">Map failed to load</h2>
              <p className="text-foreground/60 max-w-sm mb-6 font-light">
                There was an issue loading the Google Maps API. Please check your API key, billing status, and network connection.
              </p>
              <Button onClick={() => window.location.reload()} className="bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                Retry Connection
              </Button>
            </div>
          ) : isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={mapCenter}
              zoom={13}
              options={{
                styles: [
                  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
                  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
                ],
                disableDefaultUI: true,
              }}
            >
              {/* Plot Google Directions Service Result */}
              {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true, polylineOptions: { strokeColor: "#3b82f6", strokeWeight: 5 } }} />}
              
              {/* Plot Standard Markers */}
              {displayMarkers.map((marker) => (
                <CustomMarker key={marker.id} marker={marker} onClick={() => setSelectedMarker(marker)} />
              ))}

              {/* Rendering Extra Polyline Flow over map when navigating manually */}
              {deliveryStatus !== "pending" && !directions && (
                <PolylineF
                  path={[restaurantPos, ngoPos]}
                  options={{
                    strokeColor: "#3b82f6", strokeOpacity: 0.5, strokeWeight: 4,
                    icons: [{ icon: { path: window.google?.maps?.SymbolPath?.FORWARD_CLOSED_ARROW || 0, scale: 3, fillOpacity: 1, fillColor: "#3b82f6" }, offset: "100%" }]
                  }}
                />
              )}
              
              {/* Delivery Animation Moving Marker */}
              {deliveryStatus === "on-the-way" && (
                <MarkerF
                  position={volunteerPos}
                  icon={{
                    url: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233b82f6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' className='lucide lucide-bike'%3E%3Ccircle cx='5.5' cy='17.5' r='3.5'/%3E%3Ccircle cx='18.5' cy='17.5' r='3.5'/%3E%3Cpath d='M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2'/%3E%3C/svg%3E",
                    scaledSize: new window.google.maps.Size(32, 32),
                    anchor: new window.google.maps.Point(16, 16)
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-foreground/50 space-y-4">
               <Activity className="w-8 h-8 animate-spin text-primary" />
               <p>Loading Map Component...</p>
            </div>
          )}

          {/* Floating UI Elements */}
          <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
            <Button size="icon" variant="ghost" className="glass rounded-2xl shadow-lg border-border/50 hover:bg-primary/10 h-12 w-12 text-foreground">
              <Navigation className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="glass rounded-2xl shadow-lg border-border/50 hover:bg-primary/10 h-12 w-12 text-foreground">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}