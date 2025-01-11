import Payment from "@/modals/payment-modal";

export const getMonthlyReport = async () => {
  try {
    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate the date range for the past 12 months
    const startDate = new Date(currentYear, currentMonth - 11, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);

    // Create the aggregation pipeline
    const aggregationPipeline = [
      {
        $match: {
          status: "paid",
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $lookup: {
          from: "packages",
          localField: "packageId",
          foreignField: "_id",
          as: "package",
        },
      },
      {
        $unwind: "$package",
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalPayments: { $sum: 1 },
          total: { $sum: { $toDouble: "$amount" } },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ];

    const aggregationResult = await Payment.aggregate(aggregationPipeline);

    // Define month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize report data for the past 12 months
    const reportData = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentYear, currentMonth - 11 + i, 1);
      const year = date.getFullYear();
      const month = date.getMonth();
      
      return {
        name: monthNames[month],
        year,
        totalPayments: 0,
        total: 0,
      };
    });
    

    // Map aggregation results to the report format
    aggregationResult.forEach((item) => {
      const index = reportData.findIndex(
        (rd) => rd.year === item._id.year && monthNames[item._id.month - 1] === rd.name
      );
      if (index !== -1) {
        reportData[index].totalPayments = item.totalPayments;
        reportData[index].total = item.total;
      }
    });

    // Remove year from the final output
    return reportData.map(({ name, totalPayments, total }) => ({
      name,
      totalPayments,
      total,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};


export const calculateSales = async () => {
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  // Calculate Total Sales
  const totalSalesData = await Payment.aggregate([
    { $match: { status: "paid" } },
    {
      $group: {
        _id: null,
        totalSales: { $sum: { $toDouble: "$amount" } },
      },
    },
  ]);

  const totalSales = totalSalesData.length ? totalSalesData[0].totalSales : 0;

  // Calculate Last Month's Sales
  const lastMonthSalesData = await Payment.aggregate([
    {
      $match: {
        status: "paid",
        createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: { $toDouble: "$amount" } },
      },
    },
  ]);

  const lastMonthSales = lastMonthSalesData.length
    ? lastMonthSalesData[0].totalSales
    : 0;

  // Calculate This Month's Sales
  const thisMonthSalesData = await Payment.aggregate([
    {
      $match: {
        status: "paid",
        createdAt: { $gte: startOfThisMonth },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: { $toDouble: "$amount" } },
      },
    },
  ]);

  const thisMonthSales = thisMonthSalesData.length
    ? thisMonthSalesData[0].totalSales
    : 0;

  // Calculate the Percentage Change
  let percentChange = 0;
  if (lastMonthSales > 0) {
    percentChange = ((thisMonthSales - lastMonthSales) / lastMonthSales) * 100;
  }

  return {
    totalSales,
    lastMonthSales,
    thisMonthSales,
    percentChange: parseFloat(percentChange.toFixed(2)),
  };
};
