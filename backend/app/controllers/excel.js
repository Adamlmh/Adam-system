// controllers/meetingMinutesExcel.js
const ExcelJS = require("exceljs");
const db = require("../models/index");

// 导出会议纪要数据到Excel文件
exports.exportMeetingMinutes = async (req, res) => {
  try {
    // 查询会议纪要数据
    const meetingMinutes = await db.MeetingMinutes.findAll();

    // 获取 MeetingMinutes 模型的属性
    const attributes = Object.keys(db.MeetingMinutes.rawAttributes);

    // 创建一个新的Workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Meeting Minutes");

    // 添加表头
    worksheet.addRow(attributes);

    // 将查询结果添加到Excel中
    meetingMinutes.forEach((meeting) => {
      const rowData = [];
      attributes.forEach((attribute) => {
        rowData.push(meeting[attribute]);
      });
      worksheet.addRow(rowData);
    });

    // 生成Excel文件
    const buffer = await workbook.xlsx.writeBuffer();

    // 设置响应头
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=meeting_minutes.xlsx"
    );

    // 发送Excel文件到前端
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting meeting minutes:", error);
    res.status(500).send("导出会议纪要发生错误");
  }
};
