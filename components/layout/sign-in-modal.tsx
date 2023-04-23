import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoadingDots, Google, Email } from "@/components/shared/icons";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

// Define a type for the SignInModal props
type SignInModalProps = {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
};

const SignInModal: React.FC<SignInModalProps> = ({
  showSignInModal,
  setShowSignInModal,
}) => {
  const [email, setEmail] = useState("");
  const [emailSignInClicked, setEmailSignInClicked] = useState(false);
  const [googleSignInClicked, setGoogleSignInClicked] = useState(false);
  const [showIframeModal, setShowIframeModal] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");

  const handleSignInWithEmail = () => {
    if (email) {
      setEmailSignInClicked(true);
      signIn("email", { email });
    }
  };

  const handleSignInWithGoogle = () => {
    setGoogleSignInClicked(true);
    // signIn("google"); // Uncomment this line when Google authentication is ready
  };

  const handleLinkClick = (url: string) => {
    setIframeUrl(url);
    setShowIframeModal(true);
  };

  return (
    <>
      <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <p className="text-sm text-gray-500">
              Coming soon
            </p>          
        
        </div>
      </Modal>

    </>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = () => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  };

  return { setShowSignInModal, SignInModal: SignInModalCallback };
}
