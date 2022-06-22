const { CertificationList } = require("../../models/certificationModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let certification = req.body.id
    ? await CertificationList.findById({
        _id: req.body.id,
      })
    : [];

  if (certification) {
    certificationPayload = await CertificationList.updateOne(
      { _id: req.body.id },
      req.body.data
    );
  } else {
    certificationPayload = new CertificationList({
      user: req.body.email,
      name: req.body.data.certificate_name,
      organisation: req.body.data.organisation,
      isExpired: req.body.data.issue_date_box,
      issue_date: req.body.data.issue_date,
      expiry_date: req.body.data.expiry_date,
      credential_id: req.body.data.credential_id,
      credential_url: req.body.data.credential_url,
    });
    certificationPayload = await certificationPayload.save();
  }
  return res.status(200).send({
    message: "Certification Added Successfully",
    certification: certificationPayload,
  });
});

module.exports = router;
