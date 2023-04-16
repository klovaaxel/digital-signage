import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import auth from '../infrastructure/auth';
import firebase from 'firebase/compat/app';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('login-component')
export class LoginComponent extends LitElement {
  public static ui =
    firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    startFirebaseUi(LoginComponent.ui);
  }

  render() {
    return html`<h1 style="color:white">Login</h1>
      <section id="firebaseui-auth-container"></section>`;
  }
}

function startFirebaseUi(ui: firebaseui.auth.AuthUI) {
  ui.start('#firebaseui-auth-container', {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.

        console.log(authResult);

        return true;
      },
    },
    signInSuccessUrl: 'http://localhost:3000/digital-signage/', // This is where should redirect if the sign in is successful.
    signInOptions: [
      // This array contains all the ways an user can authenticate in your application. For this example, is only by email.
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      },
    ],
    tosUrl: 'https://www.example.com/terms-conditions', // URL to you terms and conditions.
    privacyPolicyUrl: function () {
      // URL to your privacy policy
      window.location.assign('https://www.example.com/privacy-policy');
    },
  });
}
