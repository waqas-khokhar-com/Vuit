import React from "react";
import Tour1 from "../../assets/Tour1";
import Tour2 from "../../assets/Tour2";
import Tour3 from "../../assets/Tour3";
import Tour4 from "../../assets/Tour4";
import Toast from "react-native-simple-toast";

export const showToast = (message) => {
  Toast.show(message, Toast.SHORT, ["UIAlertController"]);
};

export const resendLimit = 60;

export const ACCOUNT_STATUS_ACTIVE = "active";
export const FCM_TOKEN = "fcm_token";
export const ACCOUNT_TYPE_FREEMIUM = "Freemium";
export const ACCOUNT_TYPE_PREMIUM = "Premium";
export const ACCOUNT_STATUS_LOCKED = "locked";
export const ACCOUNT_STATUS_BLOCKED = "blocked";
export const INPUT_HEIGHT = 40;
export const ACCESS_TOKEN = "access_token";
export const CURRENT_USER = "current_user";
export const termsAndCondition = "Terms & Conditions";
export const documentLoaderMessage =
  "Please wait while we upload your policy document";
export const LetUsKnowWhichPolicyYouHave =
  "Which of the following policies do you have?";
export const privacyPolicy = "Privacy Policy";
export const iAgreeToVuit = "I agree to VüIT's ";

export const ClickToScanPolicies =
  "Please click on the button below to scan your policies";
export const ChooseFromGallery =
  "Choose from Gallery to upload an existing image";
export const IS_TOUR_VISITED = "IS_TOUR_VISITED";
export const IS_TUTORIAL_VISITED = "IS_TUTORIAL_VISITED";
export const FrequentlyAskedQuestions = "Frequently Asked Questions";
export const WriteToUs = "Write to Us if you still need Help";
export const IS_ALREADY_LOGIN = "IS_ALREADY_LOGIN";
export const IS_FINGERPRINT_ENABLE = "IS_FINGERPRINT_ENABLE";
export const PHONE_VERIFICATION_ID = "PHONE_VERIFICATION_ID";
export const GotoDashboard = "Go to Dashboard";
export const NeedHelpUploadingPolicies = "Need Help Uploading Policies ?";
export const Skip = "Skip";
export const ReferAFriend = "Refer a Friend";
export const Help = "Help";
export const SelectYourPlan = "Select Your Plan";
export const PolicyDetails = "Policy Details";
export const SubscribeFor20 = "$ 20 Subscribe";
export const SubscribeFor216 = "$ 216 Subscribe";
export const Attachments = "Attachments";
export const SubscriptionConfirmationMessage =
  "The subscription will continue unless canceled in Settings at least one day before a subscription period ends.";
export const AllSubsCanBeCancelAtAnyTime =
  "All subscriptions can be cancelled at any time";
export const IssueType = "Issue Type";
export const queryMessage =
  "We have received your query and are working to resolve it";
export const Description = "Description";
export const EnterQuery = "Enter your query here";
export const Preferences = "Preferences";
export const PrivacySecurity = "Privacy & Security";
export const Legal = "Legal";
export const SaveChanges = "Save Changes";
export const AddVerify = "Add & Verify";
export const Verified = "Verified";
export const Logout = "Logout";
export const CreditsEarned = "Credits Earned";
export const AnalyticsDashboard = "Analytics Dashboard";
export const UploadYourPhoto = "Upload your photo";
export const Home = "Home";
export const AddPolicy = "Add Policy";
export const Continue = "Continue";
export const EndTour = "End Tour";
export const Welcome = "Welcome";
export const NoThankYou = "No, thank you";
export const Type = "Type";
export const Renewal = "Renewal";
export const Insurer = "Insurer";
export const Notifications = "Notifications";
export const Documents = "Documents";
export const PolicyDocuments = "Policy Documents";
export const LoginAttemptsLeft = "Incorrect Email or Password";
export const Login = "Login";
export const Edit = "Edit";
export const MyProfile = "My Profile";
export const UpdateProfile = "Update Profile";
export const ChangePassword = "Change Password";
export const YourDataDashboard = "Your Data Dashboard";
export const Enter = "Enter";
export const Send = "Send";
export const Submit = "Submit";
export const UseTouchID = "Use Touch ID";
export const UseFingerprint = "Use Fingerprint";
export const UseTouchIDToAccessAccount =
  "Use your Touch ID and access your account faster";
export const UseFingerprintToAccessAccount =
  "Use your Fingerprint and access your account faster";
export const Verification = "Verification";
export const LoginWithTouchID = "Login with Touch ID";
export const LoginWithFingerprint = "Login with Fingerprint";
export const MakeSureNumberIsCorrect = "Make sure the phone number is correct.";
export const SendCodeOnNumber = "Please enter the code we send to";
export const Congratulations = "Congratulations!";
export const AccountSuccessfullyUnlocked = "Account Successfully Unlocked ";
export const AccountSuccessMessage =
  "Your account has been successfully created.";
export const Register = "Register";
export const CreateAccount = "Create Account";
export const SignUp = "Sign Up";
export const PaymentSuccessful = "Payment Successful";
export const EmailVerification = "Email verification";
export const Minimum8Characters = "Min 8 characters";
export const AtLeast1Letter = "1 letter";
export const AtLeast1Number = "1 number";
export const SpecialCharacterMsg = "1 special character";
export const Email = "Email";
export const Password = "Password";
export const Unlock = "Unlock";
export const AccountLocked = "Account Locked";
export const AccountLockMsg =
  "Your account is locked due to multiple incorrect login attempts and security";
export const attemptLeft = "attempt left";
export const ForgotPassword = "Forgot Password?";
export const CreateNewPassword = "Create new password";
export const ConfirmNewPassword = "Confirm New Password";
export const NewPassword = "New Password";
export const SavePassword = "Save Password";
export const ResetPassword = "Reset Password";
export const ForgotYourPassword = "Forgot Your Password?";
export const ResetPasswordMsg =
  "Please enter the 6 digit code to reset password";
export const ForgotPasswordInstr =
  "Enter your email address and we will send you instructions to reset your pasword";
export const IncorrectEmailOrPassword = "Incorrect Email or Password";
export const DontHaveAnAccount = "Don't have an account, ";
export const LetsGetStarted = "Let's Get Started";
export const AlreadyRegistered = "Already Registered?";
export const DidntReceiveCode = "Didn't receive code?";
export const FirstName = "First Name";
export const LetsGo = "Let's Go";
export const Done = "Done";
export const QuickTutorial = "Quick Tutorial";
export const Recommended = "Recommended";
export const TapHereToUploadOrScanYourPolicy =
  "Tap here to upload or scan your policy";
export const QuickTutorialStep1Title = "Step 1 - Choose Your Policy";
export const QuickTutorialStep2Title = "Step 2 - Select Policy to Scan";
export const QuickTutorialStep3Title =
  "Step 3 - Scan or Upload Policies From Your Gallery";
export const SignInAgainToAccessAccount =
  "Please sign-in now to access your account.";
export const YourPasswordHasBeenReset =
  "Your password has been successfully reset and your account is now unlocked.";
export const UnlockAccount = "Unlock Account";
export const PasswordResetMsg = "Your password has been reset succesfully.";
export const AccountUnlock = "Account Unlock";
export const Resend = "Resend";
export const ResendCode = "Resend Code";
export const LastName = "Last Name";
export const Mobile = "Mobile Number";
export const Next = "Next";
export const NewsUpdates = "News & Updates";
export const Alerts = "Alerts";
export const PasswordStrength = "Password Strength";
export const CreatePassword = "Create Password";
export const CurrentPassword = "Current Password";
export const ConfirmPassword = "Confirm Password";
export const Enter6DigitCode = "Please enter the 6 digit code we emailed you";
export const SentEmailCheckInbox =
  "We have sent you an email with a code. Please check your inbox.";
export const EnableTwoFactorAuth =
  "Please add your mobile number to enable two-factor authentication";
export const PreferredName = "Preferred Name";
export const DoYouHaveReferralCode1 = "Do you have a ";
export const DoYouHaveReferralCode2 = "Referral Code";
const tour1 = require("../../assets/LottieResources/tour1.json");
const tour2 = require("../../assets/LottieResources/tour2.json");
const tour3 = require("../../assets/LottieResources/tour3.json");
const tour4 = require("../../assets/LottieResources/tour4.json");
export const slides = [
  {
    key: "s1",
    title: "Do You Have Multiple Policies?",
    image: <Tour1 width="100%" height="90%" />,
  },
  {
    key: "s2",
    title: "Upload All Your Policies To Gain A Single View",
    image: <Tour2 width="100%" height="90%" />,
  },
  {
    key: "s3",
    title: "Get Real-Time Alerts & Notifications",
    image: <Tour3 width="95%" height="90%" />,
  },
  {
    key: "s4",
    title: "Access Your Policies Form Anywhere",
    image: <Tour4 width="100%" height="90%" />,
  },
];

export const loremIpsum =
  "Lorem ipsum dolor sit amet, perfecto tractatos cu nec, at vim sint epicurei. Populo eligendi ut vim, at his utamur blandit oporteat. Usu esse conceptam eu, viderer officiis qualisque eos ei. Habeo delicata pro ei, cu pericula disputando has, eam in tation vocent eloquentiam. Per id omittam molestiae, omnis complectitur an nec. Constituam scripserit sit at, sit velit prodesset ei. Est veri legendos reprimique ad, ne ipsum efficiantur has. Cum an consul laoreet phaedrum, eam soleat doctus mediocritatem ea. Ex sale facilisi sea, an tritani pertinacia sit. Sed velit sanctus an, ius id utamur offendit abhorreant. Est ea sumo rebum reque, quidam indoctum qualisque in vel. Sanctus volumus an sit, eum nibh legere lucilius cu. Ne propriae molestie indoctum sit, reque debet omnes sed at. Ridens adipiscing vix ei. Vim persius eruditi insolens id, iudico comprehensam an has, an perpetua praesent his. Altera commodo appellantur mei cu, at nec modo discere pertinacia, vel et facilis denique pertinax. Ne per eros percipitur instructior, adipisci temporibus te usu, oporteat nominati moderatius per ex. Reformidans interpretaris at per. At sit nominavi interesset, eum te tibique fierent, ut eam affert invenire. Oratio luptatum interpretaris ne duo, at cum gubergren intellegebat, ne munere alterum comprehensam pro. Tation intellegam eam ea, ei mazim pertinax percipitur sea. Possim theophrastus et vel, modus iisque te mei. Ad vocibus detraxit vix, his te tale sale expetendis, commune vulputate per in. Ha";
