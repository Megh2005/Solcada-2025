"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useGameState } from "@/components/game-provider"
import { MapPin } from "lucide-react"

export function LocationAccess() {
  const { userLocation, setUserLocation } = useGameState()
  const [locationStatus, setLocationStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle")
  const [locationError, setLocationError] = useState<string | null>(null)

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }

    setLocationStatus("requesting")
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ latitude, longitude })
        setLocationStatus("granted")
      },
      (error) => {
        setLocationStatus("denied")
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information unavailable")
            break
          case error.TIMEOUT:
            setLocationError("Location request timed out")
            break
          default:
            setLocationError("An unknown error occurred")
            break
        }
      },
    )
  }

  return (
    <div className="text-xs text-[#00ff00] font-mono">
      {locationStatus === "idle" && (
        <Button
          onClick={requestLocation}
          variant="outline"
          size="sm"
          className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/10 text-xs h-7 px-2"
        >
          <MapPin className="h-3 w-3 mr-1" />
          Enable Location
        </Button>
      )}

      {locationStatus === "requesting" && <span>Requesting location...</span>}

      {locationStatus === "granted" && userLocation && (
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          <span>
            {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
          </span>
        </div>
      )}

      {locationStatus === "denied" && (
        <div className="flex items-center">
          <span className="text-[#00ff00]">{locationError}</span>
          <Button
            onClick={requestLocation}
            variant="outline"
            size="sm"
            className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/10 text-xs h-6 px-2 ml-2"
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}
