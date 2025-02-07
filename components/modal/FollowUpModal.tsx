import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface FollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Follow Up</DialogTitle>
          <DialogDescription>
            Schedule a follow-up meeting using the Nutshell Scheduler.
          </DialogDescription>
        </DialogHeader>

        {/* Embedded Nutshell Scheduler */}
        <div className="w-full h-[500px]">
          <iframe
            src="https://nutshelltrial.com/ell/schedule-booking/373182/QkjdbV"
            className="w-full h-full border-none rounded-md"
            title="Nutshell Scheduler"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          ></iframe>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button className="ml-2">Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpModal;
