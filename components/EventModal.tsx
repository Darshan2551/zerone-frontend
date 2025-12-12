import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Trophy,
  Scroll,
  Phone,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { EventDetails } from "../types";

// EVENT → BACKEND KEY MAP
const eventKeyMap: Record<string, string> = {
  "IT Quiz": "it-quiz",
  "GARUDA ANVESHANA": "garuda-anveshana",
  "WEB KALA VINYASA": "web-kala-vinyasa",
  VEDIX: "vedix",
  DRISHTI: "drishti",
  "RAJA NEETI SABHA": "raja-neeti",
  CHAKRAVYUHA: "chakravyuha",
  "DHWANI YUDDHA": "dhwani-yuddha",
};

interface EventModalProps {
  event: EventDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const [view, setView] = useState<"details" | "register" | "success">(
    "details"
  );

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Screenshot upload (Option 1)
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  if (!event) return null;

  // --------------------------------------------------
  // FIELD LIST PER EVENT
  // --------------------------------------------------
  const getFieldsForEvent = () => {
    const key = eventKeyMap[event.title];

    switch (key) {
      case "it-quiz":
        return [
          { key: "teamName", label: "Team Name" },
          { key: "name1", label: "Name 1" },
          { key: "usn1", label: "USN/ID 1" },
          { key: "name2", label: "Name 2" },
          { key: "usn2", label: "USN/ID 2" },
          { key: "college", label: "College" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
        ];

      case "garuda-anveshana":
        return [
          { key: "teamName", label: "Team Name" },
          { key: "name1", label: "Name 1" },
          { key: "name2", label: "Name 2" },
          { key: "name3", label: "Name 3" },
          { key: "name4", label: "Name 4" },
          { key: "usn", label: "USN/ID" },
          { key: "college", label: "College" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
          { key: "utrId", label: "UTR ID" },
          { key: "utrNumber", label: "UTR Number" },
        ];

      case "web-kala-vinyasa":
        return [
          { key: "teamName", label: "Team Name" },
          { key: "name1", label: "Name 1" },
          { key: "name2", label: "Name 2" },
          { key: "usn", label: "USN/ID" },
          { key: "college", label: "College" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
          { key: "utrId", label: "UTR ID" },
          { key: "utrNumber", label: "UTR Number" },
        ];

      case "vedix":
      case "drishti":
      case "raja-neeti":
      case "dhwani-yuddha":
        return [
          { key: "teamName", label: "Team Name" },
          { key: "name1", label: "Name 1" },
          { key: "usn", label: "USN/ID" },
          { key: "college", label: "College" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
          { key: "utrId", label: "UTR ID" },
          { key: "utrNumber", label: "UTR Number" },
        ];

      case "chakravyuha":
        return [
          { key: "teamName", label: "Team Name" },
          { key: "name1", label: "Name 1" },
          { key: "usn1", label: "USN/ID 1" },
          { key: "name2", label: "Name 2" },
          { key: "usn2", label: "USN/ID 2" },
          { key: "name3", label: "Name 3" },
          { key: "usn3", label: "USN/ID 3" },
          { key: "name4", label: "Name 4" },
          { key: "usn4", label: "USN/ID 4" },
          { key: "college", label: "College" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
          { key: "utrId", label: "UTR ID" },
          { key: "utrNumber", label: "UTR Number" },
        ];

      default:
        return [];
    }
  };

  // --------------------------------------------------
  // VALIDATION
  // --------------------------------------------------
  const validateField = (key: string, value: string) => {
    if (!value || value.trim() === "") return "Required";
    return "";
  };

  // --------------------------------------------------
  // SUBMIT — MULTIPART FORM DATA
  // --------------------------------------------------
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const fields = getFieldsForEvent();
    let newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const err = validateField(field.key, formData[field.key] || "");
      if (err) newErrors[field.key] = err;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const form = new FormData();
      form.append("payload", JSON.stringify(formData));
      form.append("eventKey", eventKeyMap[event.title]);
      form.append("eventName", event.title);

      if (screenshotFile) {
        form.append("screenshot", screenshotFile);
      }

    const API = import.meta.env.VITE_BACKEND_URL;

const res = await fetch(`${API}/register`, {
  method: "POST",
  body: form,
});


      const data = await res.json();
      if (data.ok) setView("success");
      else alert(data.message);
    } catch {
      alert("Network Error");
    }

    setLoading(false);
  };

  // RESET
  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setView("details");
      setFormData({});
      setErrors({});
      setScreenshotFile(null);
    }, 300);
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={resetAndClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            layoutId={`card-${event.id}`}
            className="relative w-full max-w-4xl bg-[#0f0404] border border-gold-600 rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar shadow-[0_0_50px_rgba(212,163,44,0.3)]"
            initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: -20 }}
          >
            {/* HEADER */}
            <div className="h-48 relative flex items-center justify-center overflow-hidden">
              <img
                src={event.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-display text-white uppercase tracking-wider">
                  {event.title}
                </h2>
                <p className="text-gold-300 mt-2 font-serif">
                  {event.subtitle}
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-900 rounded-full text-white"
              >
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {/* ================= DETAILS ================= */}
                {view === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h3 className="text-gold-500 text-2xl mb-4">Description</h3>
                    <p className="text-gray-300 mb-6">{event.description}</p>

                    <button
                      onClick={() => setView("register")}
                      className="w-full py-4 bg-gold-600 text-black font-bold tracking-widest rounded mt-6"
                    >
                      Proceed to Register
                    </button>
                  </motion.div>
                )}

                {/* ================= REGISTER ================= */}
                {view === "register" && (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* QR IF UTR EXISTS */}
                    {getFieldsForEvent().some(
                      (f) => f.key === "utrId" || f.key === "utrNumber"
                    ) && (
                      <div className="text-center mb-4">
                        <img
                          src="/assets/qr.jpg"
                          className="mx-auto w-48 mb-2"
                        />
                        <p className="text-gold-300 text-sm">
                          Scan & Pay — then fill UTR fields below
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                      {getFieldsForEvent().map((field) => (
                        <div key={field.key}>
                          <label className="block text-gold-200 mb-1">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            className="w-full bg-black/50 border border-gold-800 rounded p-3 text-white"
                            value={formData[field.key] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.key]: e.target.value,
                              })
                            }
                          />
                          {errors[field.key] && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors[field.key]}
                            </p>
                          )}
                        </div>
                      ))}

                      {/* PAYMENT SCREENSHOT */}
                      <div>
                        <label className="block text-gold-200 mb-1">
                          Payment Screenshot (optional)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setScreenshotFile(
                              e.target.files?.[0] ? e.target.files[0] : null
                            )
                          }
                          className="w-full text-white"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setView("details")}
                          className="flex-1 py-3 border border-gold-700 text-gold-400"
                        >
                          Back
                        </button>

                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-3 bg-gold-600 text-black font-bold"
                        >
                          {loading ? "Submitting..." : "Confirm"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ================= SUCCESS ================= */}
                {view === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h3 className="text-3xl text-gold-400 mb-4">
                      Registration Successful!
                    </h3>
                    <p className="text-gray-300 mb-8">
                      Your registration has been saved. Check your email for
                      confirmation.
                    </p>
                    <button
                      onClick={resetAndClose}
                      className="px-8 py-3 border border-gold-500 text-gold-400"
                    >
                      Return
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
