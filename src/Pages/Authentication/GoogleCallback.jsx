import { useEffect } from "react";

function GoogleCallback() {
  useEffect(() => {
    // Get the id_token from URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const idToken = params.get("id_token");
    const error = params.get("error");

    if (error) {
      // Send error to parent window
      if (window.opener) {
        window.opener.postMessage(
          { type: "GOOGLE_AUTH_ERROR", error },
          window.location.origin
        );
      }
      window.close();
      return;
    }

    if (idToken) {
      // Send the id_token to the parent window
      if (window.opener) {
        window.opener.postMessage(
          { type: "GOOGLE_AUTH_SUCCESS", idToken },
          window.location.origin
        );
        window.close();
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

export default GoogleCallback;
