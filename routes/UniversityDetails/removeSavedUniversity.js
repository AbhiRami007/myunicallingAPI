const { SavedList } = require("../../models/savedListModel");
const express = require("express");
const router = express.Router();

router.put("/", async (req, res) => {
  let savedList = await SavedList.find({
    user: req.body.params.user,
    isSaved: true,
  });
  let removePayload;
  if (
    !savedList &&
    !savedList.length &&
    !savedList[0].university_name?.includes(req.body.params.id)
  ) {
    return res.status(500).send("Cannot find item");
  } else {
    removePayload = await SavedList.updateOne(
      { user: req.body.params.user },
      {
        $pull: {
          university_name: req.body.params.id,
        },
      }
    );
  }
  return res.status(200).send({
    message: "removed Successfully",
    university: removePayload,
  });
});

module.exports = router;
