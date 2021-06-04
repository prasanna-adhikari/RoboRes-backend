const Tables = require("../model/tableModel");

exports.addTable = async (req, res) => {
  try {
    const { table_no, capacity } = req.body;

    let tableNum = await Tables.findOne({ table_no });

    if (tableNum) {
      return res.status(409).json({ success: false, msg: "Table exists" });
    }

    const table = Tables({
      table_no,
      capacity,
    });
    table.save();
    return res.status(200).json({ success: true, msg: "Table added" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: "error adding cart" });
  }
};

exports.getAllTable = async (req, res) => {
  try {
    const tables = await Tables.find();
    return res.status(200).json({ success: true, tables });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: "cannot get all table" });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const tableid = req.params.id;
    await Tables.deleteOne({ _id: tableid });
    return res.status(200).json({ msg: "deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: "cannot delete Table" });
  }
};

exports.updateTable = async (req, res) => {
  try {
    const id = req.params.id;
    const { table_no, capacity } = req.body;

    let tableNum = await Tables.findOne({ table_no });

    if (tableNum) {
      // table num ra table id check gareko
      if (tableNum.table_no == table_no && tableNum._id.toString() == id) {
        tableNum.capacity = capacity;

        await tableNum.save();

        return res
          .status(200)
          .json({ success: true, msg: "Updated table added" });
      }
      return res.status(409).json({ success: false, msg: "Table exists" });
    }

    const table = await Tables.findById(id);

    table.table_no = table_no;
    table.capacity = capacity;

    await table.save();

    return res.status(200).json({ success: true, msg: "Updated table added" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ err: "cannot update table", devMsg: err.message });
  }
};

exports.occupiedTable = async (req, res) => {
  try {
    const table_no = req.body.table_no;
    // const table_no = req.body.id;
    let table = await Tables.findOne({ table_no });
    if (!table) return res.status(400).json({ msg: "Table Not Found" });

    if (table.status === "Packed") {
      return res.status(407).json({ msg: "alredy Packed" });
    }

    // change status of table
    let updatedTable;
    if (table.status.includes("Booked")) {
      table.status.push("Packed");
      updateTable = await table.save();
    } else {
      table.status = "Packed";
      updatedTable = await table.save();
    }

    return res.status(200).json({
      success: true,
      msg: "Tabel is packed now",
      result: updatedTable,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: "cannot occupie table" });
  }
};

exports.freeTable = async (req, res) => {
  try {
    const table_no = req.params.id;
    let table = await Tables.findOne({ table_no });

    table.status = "Free";

    await table.save();

    return res.status(200).json({ success: true, msg: "Tabel is free" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: "cannot free table" });
  }
};
