/**
 * Snowwflix – Real Firebase Authentication + MongoDB Sync
 * Requires: firebase-app, firebase-auth, firebase-firestore already loaded
 * and window.auth / window.db from index.html init
 */

(function () {
  "use strict";

  // ========== CHANGE THIS TO YOUR RENDER BACKEND URL ==========
  const BACKEND_URL = "https://YOUR-RENDER-SERVICE-NAME.onrender.com";
  // Example: "https://snowwflix-backend.onrender.com"
  // ============================================================

  // Wait until Firebase is ready
  function whenReady(cb) {
    if (window.firebase && window.auth) {
      cb();
    } else {
      setTimeout(() => whenReady(cb), 50);
    }
  }

  whenReady(initAuth);

  function initAuth() {
    const auth = window.auth;
    const db = window.db;

    // ---- DOM ----
    const modal = document.getElementById("account-modal");
    const authMsg = document.getElementById("auth-msg");
    const authHeading = document.getElementById("auth-heading");

    const step1 = document.getElementById("signup-step1");
    const step2 = document.getElementById("signup-step2");
    const loginForm = document.getElementById("login-form");

    const signinOpen = document.getElementById("signin-open");
    const signoutBtn = document.getElementById("signout-btn");
    const accountClose = document.getElementById("account-close");

    const menuAvatar = document.getElementById("menu-avatar");
    const menuName = document.getElementById("menu-display-name");
    const menuEmail = document.getElementById("menu-user-email");

    function
