import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure your Mutumwa AI assistant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assistant-name" className="text-slate-300">
                Assistant Name
              </Label>
              <Input
                id="assistant-name"
                defaultValue="Mutumwa AI"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-language" className="text-slate-300">
                Default Language
              </Label>
              <Select defaultValue="shona">
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="shona">Shona (chiShona)</SelectItem>
                  <SelectItem value="ndebele">Ndebele (isiNdebele)</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-translate" className="text-slate-300">
                Auto-translate responses
              </Label>
              <Switch id="auto-translate" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Response Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="response-time" className="text-slate-300">
                Max Response Time (seconds)
              </Label>
              <Input
                id="response-time"
                type="number"
                defaultValue="5"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="context-memory" className="text-slate-300">
                Context Memory
              </Label>
              <Switch id="context-memory" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="learning-mode" className="text-slate-300">
                Learning Mode
              </Label>
              <Switch id="learning-mode" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts" className="text-slate-300">
                Email Alerts
              </Label>
              <Switch id="email-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-alerts" className="text-slate-300">
                SMS Alerts
              </Label>
              <Switch id="sms-alerts" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-reports" className="text-slate-300">
                Daily Reports
              </Label>
              <Switch id="daily-reports" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">API Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-slate-300">
                API Key
              </Label>
              <Input
                id="api-key"
                type="password"
                defaultValue="••••••••••••••••"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-url" className="text-slate-300">
                Webhook URL
              </Label>
              <Input
                id="webhook-url"
                placeholder="https://your-app.com/webhook"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Configuration</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
