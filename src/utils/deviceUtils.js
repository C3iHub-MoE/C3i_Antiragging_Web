// src/utils/deviceUtils.js

// Get platform (OS) information
export const getPlatform = () => {
    // If the user is on the web, return "Web"
    if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
      return 'Web';
    }
  
    // Otherwise, use the navigator.platform to get platform details
    const platform = navigator.platform || 'Unknown';
    return platform;
  };
  // Generate a unique device ID using localStorage or sessionStorage
  // In a real mobile app, this would be replaced with an actual device identifier.
  export const getDeviceId = () => {
    const deviceId = localStorage.getItem('deviceId');
    if (deviceId) {
      return deviceId; // Return the existing device ID if it exists
    } else {
      const newDeviceId = generateUUID();
      localStorage.setItem('deviceId', newDeviceId); // Save the generated ID
      return newDeviceId;
    }
  };
  
  // Helper function to generate a simple UUID (for device identification purposes)
  const generateUUID = () => {
    // Simple UUID generator (you can replace this with more complex methods if needed)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  
  