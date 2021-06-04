const Booking = require("../model/bookingModel");
const Table = require("../model/tableModel");
const date = require("date-and-time");

// Add Booking
exports.postBooking = async (req, res) => {
  let { table_no, people, booking_date } = req.body;
  try {
    const user = req.user._id;
    // find booking table in Tables
    let table = await Table.findOne({ table_no });
    if (!table) {
      return res
        .status(407)
        .json({ success: false, error: "table doesnot exits" });
    }

    //check people and seat
    if (table.capacity < people) {
      return res.status(407).json({ success: false, error: "Capacity exceed" });
    }

    // check tables in booking
    let check_table_booking = await Booking.findOne({ table_no });

    if (check_table_booking) {
      return res
        .status(409)
        .json({ success: false, error: "Table already booked" });
    }
    // change status of table
    if (table.status === "Free") {
      table.status = "Booked";
      const data = await table.save();

      console.log("status is changed to booked", data);
    } else {
      table.status.push("Booked");
      await table.save();
      console.log("status is updated to booked");
    }

    booking_date = date.parse(booking_date, "YYYY/MM/DD HH:mm");
    console.log(booking_date);
    const cancel_time = date.addMinutes(booking_date, -5);
    console.log(cancel_time);

    const booking = new Booking({
      user,
      table_no,
      people,
      booking_date,
      cancel_time,
    });
    await booking.save();
    return res.status(200).json({ msg: "Booked" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "error booking table" });
  }
};

// exports.postBooking = async (req, res) => {
//   try {
//     let { table_no, people, booking_date } = req.body;
//     Booking.findOne({ user: req.user._id }).then(async (booking) => {
//       if (!booking) {
//         let tableno = await Booking.findOne({ table_no });
//         if (tableno) {
//           return res
//             .status(409)
//             .json({ success: false, error: "Table already booked" });
//         }

//         booking_date = date.parse(booking_date, "YYYY/MM/DD HH:mm");
//         console.log(booking_date);
//         const cancel_time = date.addMinutes(booking_date, -5);
//         console.log(cancel_time);

//         const booking = new Booking({
//           user: req.user._id,
//           table_no,
//           people,
//           booking_date,
//           cancel_time,
//         });
//         await booking.save();
//         return res.status(200).json({ msg: "Booked" });
//       } else {
//         Booking.findOne;
//       }
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ err: "error booking table" });
//   }
// };

exports.getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name");
    console.log(bookings);
    return res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Cannot get bookings" });
  }
};

exports.getSingleBooking = async (req, res) => {
  try {
    const booking = await Booking.find({ user: req.user._id }).populate(
      "user",
      "name"
    );
    return res.status(200).json({ success: true, booking });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Cannot get single bookings" });
  }
};
exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  const booking = await Booking.findOne({ _id: bookingId });
  let table_no = booking.table_no;
  console.log("table no", table_no);
  let table = await Table.findOne({ table_no });
  if (table.status.includes("Packed")) {
    table.status.pull("Booked");
    await table.save();
  } else {
    table.status = "Free";
    await table.save();
  }
  // res.json({ booking: booking, table: table });
  await Booking.deleteOne({ _id: bookingId })
    .then(async () => {
      return res
        .status(200)
        .json({ success: true, msg: "booking deleted successfuly" });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ success: false, err: "Cant delete booking" });
    });
};

exports.updateBooking = async (req, res) => {
  let { table_no, people, booking_date } = req.body;
  // booking_date = date.parse(booking_date, "YYYY/MM/DD HH:mm");
  // let cancleTime = date.addMinutes(booking_date, -30);
  const user = req.user._id;
  try {
    const id = req.params.id;

    let data = await Booking.findOne({ _id: id });
    // check table
    // const tableno = data.table_no;
    // if (tableno) {
    //   return res
    //     .status(409)
    //     .json({ success: false, error: "Table already booked" });
    // }
    // check people capacity
    const capacity = data.capacity;
    if (capacity < people) {
      return res.status(407).json({ success: false, error: "Capacity exceed" });
    }
    console.log(capacity);

    const formattedCancelTime = new Date(data.cancel_time).getTime();
    const currentTime = new Date().getTime();
    if (currentTime > formattedCancelTime) {
      return res
        .status(409)
        .json({ success: false, error: "Update time expire" });
    }

    booking_date = date.parse(booking_date, "YYYY/MM/DD HH:mm");
    let cancel_time = date.addMinutes(booking_date, -5);

    Booking.findByIdAndUpdate(id, {
      $set: {
        user,
        table_no,
        people,
        booking_date,
        cancel_time,
      },
    }).then(function () {
      res.json({ success: true });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Could not update booking" });
  }
};
