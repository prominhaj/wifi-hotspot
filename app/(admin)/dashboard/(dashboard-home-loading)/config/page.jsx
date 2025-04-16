import { getMikrotikConfig } from "@/queries/config";
import MikrotikConfigForm from "./_components/MikrotikConfigForm";

export default async function ConfigPage() {
  const mikrotikConfig = await getMikrotikConfig(true);
  return (
    <div>
      <MikrotikConfigForm initialConfig={mikrotikConfig}/>
    </div>
  );
}
