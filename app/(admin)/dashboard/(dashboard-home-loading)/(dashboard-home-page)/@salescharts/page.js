import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardBarChart from "../../../_components/BarChart/BarChart";
import { getMonthlyReport } from "@/queries/admin";

const DashboardSalesCharts = async () => {
  const reports = await getMonthlyReport();
    
  return (
    <Card className="xl:col-span-2 bg-background/20">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Monthly Sales Charts</CardTitle>
      </CardHeader>
      <CardContent>
        <DashboardBarChart chartData={reports} />
      </CardContent>
    </Card>
  );
};

export default DashboardSalesCharts;
