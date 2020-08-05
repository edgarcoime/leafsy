// Firebase imports
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// dependencies
const nodemailer = require("nodemailer");

// Array functions
const arrayRemove = admin.firestore.FieldValue.arrayRemove;
const arrayUnion = admin.firestore.FieldValue.arrayUnion;

// upon user Creation initializes roles
exports.newUserSignup = functions.auth.user().onCreate(async (user) => {
  // Create a record for user in DB
  admin.firestore().collection("users").doc(user.uid).set(
    {
      recommendations: [],
      orders: [],
    },
    { merge: true }
  );

  // Initialize admin and moderator roles
  return admin.auth().setCustomUserClaims(user.uid, {
    approvedVendor: false,
    moderator: false,
    admin: false,
  });
});

// upon user Deletion
exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log("User has been deleted", user.email, user.uid);

  // Delete user profile in Database
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

// <<======================WATCHING RECOMMENTDATION WRITES=========================>>
// UPON CREATING RECOMMENDATION DOC add doc ref into User Profile
exports.onRecoCreate = functions.firestore
  .document("recommendations/{recoId}")
  .onCreate((snap, context) => {
    const doc = snap.data();
    const userId = doc.assignedTo;
    const docId = context.params.recoId;

    const userRef = admin.firestore().collection("users").doc(userId);

    if (!userRef) {
      return snap.ref.update({ assignedTo: null })
    }

    const {
      address,
      confirmationNumber,
      createdAt: firebaseDate,
      deliveryOptions,
      description,
      email: ownerEmail,
      firstName,
      lastName,
      phoneNumber,
      genre,
    } = doc;

    const createdAt = firebaseDate.toDate().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const titleHeader = "Recommendation Received!"
    const confirmationHeader = "RECOMMENDATION CONFIRMATION"

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "leafsyforms@gmail.com",
        pass: "jahirvcygyyeesbg",
      }
    });
    const mailOption = {
      from: 'Leafsy <leafsyforms@gmail.com>',
      to : ownerEmail,
      subject: `Recommendation request received ${firstName}!`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" style="line-height: inherit;">
      <head style="line-height: inherit;">
      <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" style="line-height: inherit;">
      <meta content="width=device-width" name="viewport" style="line-height: inherit;">
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible" style="line-height: inherit;">
      <!--<![endif]-->
      <title style="line-height: inherit;"></title>
      <!--[if !mso]><!-->
      <!--<![endif]-->
      <style type="text/css" style="line-height: inherit;">
          body {
            margin: 0;
            padding: 0;
          }
      
          table,
          td,
          tr {
            vertical-align: top;
            border-collapse: collapse;
          }
      
          * {
            line-height: inherit;
          }
      
          a[x-apple-data-detectors=true] {
            color: inherit !important;
            text-decoration: none !important;
          }
        </style>
      <style id="media-query" type="text/css" style="line-height: inherit;">
          @media (max-width: 520px) {
      
            .block-grid,
            .col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
      
            .block-grid {
              width: 100% !important;
            }
      
            .col {
              width: 100% !important;
            }
      
            .col>div {
              margin: 0 auto;
            }
      
            img.fullwidth,
            img.fullwidthOnMobile {
              max-width: 100% !important;
            }
      
            .no-stack .col {
              min-width: 0 !important;
              display: table-cell !important;
            }
      
            .no-stack.two-up .col {
              width: 50% !important;
            }
      
            .no-stack .col.num4 {
              width: 33% !important;
            }
      
            .no-stack .col.num8 {
              width: 66% !important;
            }
      
            .no-stack .col.num4 {
              width: 33% !important;
            }
      
            .no-stack .col.num3 {
              width: 25% !important;
            }
      
            .no-stack .col.num6 {
              width: 50% !important;
            }
      
            .no-stack .col.num9 {
              width: 75% !important;
            }
      
            .video-block {
              max-width: none !important;
            }
      
            .mobile_hide {
              min-height: 0px;
              max-height: 0px;
              max-width: 0px;
              display: none;
              overflow: hidden;
              font-size: 0px;
            }
      
            .desktop_hide {
              display: block !important;
              max-height: none !important;
            }
          }
        </style>
      </head>
      <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;line-height: inherit;">
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed;vertical-align: top;min-width: 320px;margin: 0 auto;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;width: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td style="word-break: break-word;vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 42px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 50px; margin: 0;"><span style="font-size: 42px;line-height: inherit;">${titleHeader}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td class="divider_inner" style="word-break: break-word;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;line-height: inherit;border-collapse: collapse;" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-top: 4px solid #FF9953;width: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td style="word-break: break-word;vertical-align: top;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;border-collapse: collapse;" valign="top"><span style="line-height: inherit;"></span></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: #fff4ed;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff4ed;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 28px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 34px; margin: 0;"><span style="font-size: 28px;line-height: inherit;">${confirmationHeader}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;">CONFIRMATION ID: ${confirmationNumber}</p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 26px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 31px; margin: 0;"><span style="font-size: 26px;line-height: inherit;">Order Summary</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;">${createdAt}</p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td class="divider_inner" style="word-break: break-word;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;line-height: inherit;border-collapse: collapse;" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-top: 1px solid #FF9953;width: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td style="word-break: break-word;vertical-align: top;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;border-collapse: collapse;" valign="top"><span style="line-height: inherit;"></span></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid mixed-two-up" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="166" style="background-color:transparent;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num4" style="display: table-cell;vertical-align: top;max-width: 320px;min-width: 164px;width: 166px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Name</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Email</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Phone</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Delivery</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Address</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Genre</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td><td align="center" width="333" style="background-color:transparent;width:333px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num8" style="display: table-cell;vertical-align: top;min-width: 320px;max-width: 328px;width: 333px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${firstName} ${lastName}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${ownerEmail}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${phoneNumber}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${deliveryOptions}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${address}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${genre}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Description</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${description}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td class="divider_inner" style="word-break: break-word;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;line-height: inherit;border-collapse: collapse;" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-top: 4px solid #FF9953;width: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td style="word-break: break-word;vertical-align: top;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;border-collapse: collapse;" valign="top"><span style="line-height: inherit;"></span></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (IE)]></div><![endif]-->
      </body>
      </html>`,
    }

    transport.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Email sent: ${info.response}`);
        res.json(info)
      }
    });

    return userRef.update({
      recommendations: arrayUnion(docId),
    });
  });

// Upon deleting reco
exports.onRecoDelete = functions.firestore
  .document("recommendations/{recoId}")
  .onDelete((snap, context) => {
    const userId = snap.data().assignedTo;
    const docId = context.params.recoId;

    const userRef = admin.firestore().collection("users").doc(userId);
    return userRef.update({
      recommendations: arrayRemove(docId),
    });
  });

// <<======================WATCHING ORDER WRITES=========================>>
// UPON CREATING ORDER DOC add doc ref into User Profile
exports.onOrderCreate = functions.firestore
  .document("orders/{orderId}")
  .onCreate((snap, context) => {
    const doc = snap.data();
    const userId = doc.assignedTo;
    const docId = context.params.orderId;

    const userRef = admin.firestore().collection("users").doc(userId);

    if (!userRef) {
      return snap.ref.update({ assignedTo: null })
    }

    // Send email

    const {
      address,
      confirmationNumber,
      createdAt: firebaseDate,
      deliveryOptions,
      description,
      email: ownerEmail,
      firstName,
      lastName,
      phoneNumber,
      bookTitle: title,
      bookAuthor: author
    } = doc;

    const createdAt = firebaseDate.toDate().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const titleHeader = "Thank you for your order"
    const confirmationHeader = "ORDER CONFIRMATION"

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "leafsyforms@gmail.com",
        pass: "jahirvcygyyeesbg",
      }
    });
    const mailOption = {
      from: 'Leafsy <leafsyforms@gmail.com>',
      to : ownerEmail,
      subject: `Book Order received ${firstName}!`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" style="line-height: inherit;">
      <head style="line-height: inherit;">
      <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" style="line-height: inherit;">
      <meta content="width=device-width" name="viewport" style="line-height: inherit;">
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible" style="line-height: inherit;">
      <!--<![endif]-->
      <title style="line-height: inherit;"></title>
      <!--[if !mso]><!-->
      <!--<![endif]-->
      <style type="text/css" style="line-height: inherit;">
          body {
            margin: 0;
            padding: 0;
          }
      
          table,
          td,
          tr {
            vertical-align: top;
            border-collapse: collapse;
          }
      
          * {
            line-height: inherit;
          }
      
          a[x-apple-data-detectors=true] {
            color: inherit !important;
            text-decoration: none !important;
          }
        </style>
      <style id="media-query" type="text/css" style="line-height: inherit;">
          @media (max-width: 520px) {
      
            .block-grid,
            .col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
      
            .block-grid {
              width: 100% !important;
            }
      
            .col {
              width: 100% !important;
            }
      
            .col>div {
              margin: 0 auto;
            }
      
            img.fullwidth,
            img.fullwidthOnMobile {
              max-width: 100% !important;
            }
      
            .no-stack .col {
              min-width: 0 !important;
              display: table-cell !important;
            }
      
            .no-stack.two-up .col {
              width: 50% !important;
            }
      
            .no-stack .col.num4 {
              width: 33% !important;
            }
      
            .no-stack .col.num8 {
              width: 66% !important;
            }
      
            .no-stack .col.num4 {
              width: 33% !important;
            }
      
            .no-stack .col.num3 {
              width: 25% !important;
            }
      
            .no-stack .col.num6 {
              width: 50% !important;
            }
      
            .no-stack .col.num9 {
              width: 75% !important;
            }
      
            .video-block {
              max-width: none !important;
            }
      
            .mobile_hide {
              min-height: 0px;
              max-height: 0px;
              max-width: 0px;
              display: none;
              overflow: hidden;
              font-size: 0px;
            }
      
            .desktop_hide {
              display: block !important;
              max-height: none !important;
            }
          }
        </style>
      </head>
      <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;line-height: inherit;">
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed;vertical-align: top;min-width: 320px;margin: 0 auto;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;width: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td style="word-break: break-word;vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 42px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 50px; margin: 0;"><span style="font-size: 42px;line-height: inherit;">${titleHeader}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td class="divider_inner" style="word-break: break-word;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;line-height: inherit;border-collapse: collapse;" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-top: 4px solid #FF9953;width: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td style="word-break: break-word;vertical-align: top;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;border-collapse: collapse;" valign="top"><span style="line-height: inherit;"></span></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: #fff4ed;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff4ed;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 28px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 34px; margin: 0;"><span style="font-size: 28px;line-height: inherit;">${confirmationHeader}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;">CONFIRMATION ID: ${confirmationNumber}</p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 26px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 31px; margin: 0;"><span style="font-size: 26px;line-height: inherit;">Order Summary</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;">${createdAt}</p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td class="divider_inner" style="word-break: break-word;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;line-height: inherit;border-collapse: collapse;" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-top: 1px solid #FF9953;width: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td style="word-break: break-word;vertical-align: top;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;border-collapse: collapse;" valign="top"><span style="line-height: inherit;"></span></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid mixed-two-up" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="166" style="background-color:transparent;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num4" style="display: table-cell;vertical-align: top;max-width: 320px;min-width: 164px;width: 166px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Name</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Email</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Phone</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Delivery</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Address</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Title</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Author</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td><td align="center" width="333" style="background-color:transparent;width:333px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num8" style="display: table-cell;vertical-align: top;min-width: 320px;max-width: 328px;width: 333px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${firstName} ${lastName}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${ownerEmail}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${phoneNumber}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${deliveryOptions}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${address}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${title}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: right; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${author}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <div style="background-color: transparent;line-height: inherit;">
      <div class="block-grid" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;line-height: inherit;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;width: 500px;line-height: inherit;">
      <div style="width: 100% !important;line-height: inherit;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 5px;padding-bottom: 5px;padding-right: 0px;padding-left: 0px;line-height: inherit;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;"><strong style="line-height: inherit;"><span style="font-size: 20px;line-height: inherit;">Description</span></strong></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
      <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
      <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;line-height: inherit;">${description}</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td class="divider_inner" style="word-break: break-word;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;line-height: inherit;border-collapse: collapse;" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed;vertical-align: top;border-spacing: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-top: 4px solid #FF9953;width: 100%;line-height: inherit;" valign="top" width="100%">
      <tbody style="line-height: inherit;">
      <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;" valign="top">
      <td style="word-break: break-word;vertical-align: top;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;border-collapse: collapse;" valign="top"><span style="line-height: inherit;"></span></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (IE)]></div><![endif]-->
      </body>
      </html>`,
    }

    transport.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Email sent: ${info.response}`);
        res.json(info)
      }
    });

    return userRef.update({
      orders: arrayUnion(docId),
    });
  });

// Upon deleting order
exports.onOrderDelete = functions.firestore
  .document("orders/{orderId}")
  .onDelete((snap, context) => {
    const userId = snap.data().assignedTo;
    const docId = context.params.orderId;

    const userRef = admin.firestore().collection("users").doc(userId);
    return userRef.update({
      orders: arrayRemove(docId),
    });
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
