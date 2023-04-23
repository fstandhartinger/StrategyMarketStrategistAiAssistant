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
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://goldenretriever.cloud">
              <Image
                src="/logo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-display text-2xl font-bold">Sign In</h3>

            <p className="text-sm text-gray-500">
              only your email and profile picture will be stored.
            </p>
          </div>

          <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
            <input
              disabled={emailSignInClicked}
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-md border border-gray-200 px-3 py-2"
            />
            <button
              disabled={emailSignInClicked}
              className={`${
                emailSignInClicked
                  ? "cursor-not-allowed border-gray-200 bg-gray-100"
                  : "border border-gray-200 bg-white text-black hover:bg-gray-50"
              } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
              onClick={handleSignInWithEmail}
            >
              {emailSignInClicked ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <Email className="h-5 w-5" />
                  <p>Sign In with your Email</p>
                </>
              )}
            </button>
          </div>
          <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-1 md:px-16">
            <p className="text-center text-xs text-gray-500">or</p>
          </div>
          <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
            <button
              disabled={true}
              className={`${
                googleSignInClicked
                  ? "cursor-not-allowed border-gray-200 bg-gray-100"
                  : "border border-gray-200 bg-white text-black hover:bg-gray-50"
              } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
              onClick={handleSignInWithGoogle}
            >
              {googleSignInClicked ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <Google className="h-5 w-5" />
                  <p>Sign In with Google</p>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500">
              Google authentication is coming soon.
            </p>
          </div>

          <div className="flex flex-col space-y-4 bg-white px-4 py-6 md:px-16 border-gray-100 border-t">
            <p className="text-center text-xs text-gray-500">
              By signing in you agree with our{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => handleLinkClick("/termsandconditions")}
              >
                terms and conditions
              </button>{" "}
              and our{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => handleLinkClick("/dataprotection")}
              >
                data protection policy
              </button>
              .
            </p>
          </div>
        </div>
      </Modal>

      {/* Iframe modal */}
      <Modal showModal={showIframeModal} setShowModal={setShowIframeModal}>
        <div className="h-full w-full overflow-hidden shadow-xl md:max-w-3xl md:rounded-2xl md:border md:border-gray-200">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={() => setShowIframeModal(false)}
          >
            &times;
          </button>
          <iframe
            src={iframeUrl}
            className="h-full w-full border-none"
            title="Modal Content"
          ></iframe>
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
