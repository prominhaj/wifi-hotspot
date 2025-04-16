import { getMikrotikConfig } from "@/queries/config";
import MikrotikConfigForm from "./_components/MikrotikConfigForm";

export default async function ConfigPage() {
  const mikrotikConfig = await getMikrotikConfig(true);
  return (
    <div className="md:py-10 py-5">
      <MikrotikConfigForm initialConfig={mikrotikConfig}/>
    </div>
  );
}
