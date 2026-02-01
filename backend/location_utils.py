"""
Location verification utility
Checks if employee is within acceptable radius of allowed locations
"""

import math

# Allowed locations (extracted from Google Maps share links)
# Location 1: https://share.google/PseeFBdZLyJWyfzak
# Location 2: https://share.google/4RJnGZgLBLPSlF8Il
# Note: You'll need to extract actual lat/long from these links
# For now, using placeholder coordinates - REPLACE THESE WITH ACTUAL COORDINATES

ALLOWED_LOCATIONS = [
    {
        "name": "Location 1",
        "latitude": 12.894876148821162,
        "longitude": 77.63582566826675,
    },
    {
        "name": "Location 2",
        "latitude": 12.9800,  # Example: Another Bangalore location
        "longitude": 77.6000,
    }
]

ALLOWED_RADIUS_METERS = 100  # 100 meters radius


def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the distance between two points on Earth using Haversine formula
    Returns distance in meters
    """
    # Radius of Earth in meters
    R = 6371000
    
    # Convert to radians
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    
    # Haversine formula
    a = math.sin(delta_phi / 2) ** 2 + \
        math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    distance = R * c
    return distance


def is_location_allowed(latitude: float, longitude: float) -> dict:
    """
    Check if the given coordinates are within acceptable radius of any allowed location
    Returns: {"allowed": bool, "location_name": str, "distance": float}
    """
    for location in ALLOWED_LOCATIONS:
        distance = calculate_distance(
            latitude, 
            longitude, 
            location["latitude"], 
            location["longitude"]
        )
        
        if distance <= ALLOWED_RADIUS_METERS:
            return {
                "allowed": True,
                "location_name": location["name"],
                "distance": round(distance, 2)
            }
    
    # If not within any allowed location
    return {
        "allowed": False,
        "location_name": None,
        "distance": None
    }