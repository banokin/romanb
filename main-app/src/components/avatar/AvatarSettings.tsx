'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  Settings, 
  User, 
  Volume2, 
  Video,
  Palette,
  Save,
  RotateCcw
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AvatarSettingsProps {
  settings: {
    enabled: boolean
    voiceEnabled: boolean
    visualEnabled: boolean
    avatarUrl: string
    voiceId: string
    voiceSpeed: number
    voicePitch: number
    voiceVolume: number
    visualStyle: 'realistic' | 'cartoon' | 'anime'
    backgroundColor: string
    size: 'sm' | 'md' | 'lg'
  }
  onSettingsChange: (settings: any) => void
  onReset: () => void
  className?: string
}

export function AvatarSettings({
  settings,
  onSettingsChange,
  onReset,
  className
}: AvatarSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings)

  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...localSettings, [key]: value }
    setLocalSettings(newSettings)
    onSettingsChange(newSettings)
  }

  const handleSave = () => {
    onSettingsChange(localSettings)
  }

  const handleReset = () => {
    setLocalSettings(settings)
    onReset()
  }

  const voiceOptions = [
    { id: 'voice1', name: 'Freddy (Male)' },
    { id: 'voice2', name: 'Sarah (Female)' },
    { id: 'voice3', name: 'Alex (Neutral)' },
    { id: 'voice4', name: 'Emma (British)' }
  ]

  const visualStyles = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'anime', label: 'Anime' }
  ]

  const sizes = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' }
  ]

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Avatar Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* General Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4" />
            General
          </h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="avatar-enabled" className="text-sm">
              Enable Avatar
            </Label>
            <Switch
              id="avatar-enabled"
              checked={localSettings.enabled}
              onCheckedChange={(checked) => updateSetting('enabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="voice-enabled" className="text-sm">
              Voice Output
            </Label>
            <Switch
              id="voice-enabled"
              checked={localSettings.voiceEnabled}
              onCheckedChange={(checked) => updateSetting('voiceEnabled', checked)}
              disabled={!localSettings.enabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="visual-enabled" className="text-sm">
              Visual Avatar
            </Label>
            <Switch
              id="visual-enabled"
              checked={localSettings.visualEnabled}
              onCheckedChange={(checked) => updateSetting('visualEnabled', checked)}
              disabled={!localSettings.enabled}
            />
          </div>
        </div>

        {/* Voice Settings */}
        {localSettings.enabled && localSettings.voiceEnabled && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Voice
            </h3>

            <div className="space-y-2">
              <Label htmlFor="voice-select" className="text-sm">
                Voice
              </Label>
              <Select
                value={localSettings.voiceId}
                onValueChange={(value) => updateSetting('voiceId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {voiceOptions.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">
                Speed: {localSettings.voiceSpeed}
              </Label>
              <Slider
                value={[localSettings.voiceSpeed]}
                onValueChange={([value]) => updateSetting('voiceSpeed', value)}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">
                Pitch: {localSettings.voicePitch}
              </Label>
              <Slider
                value={[localSettings.voicePitch]}
                onValueChange={([value]) => updateSetting('voicePitch', value)}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">
                Volume: {localSettings.voiceVolume}
              </Label>
              <Slider
                value={[localSettings.voiceVolume]}
                onValueChange={([value]) => updateSetting('voiceVolume', value)}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Visual Settings */}
        {localSettings.enabled && localSettings.visualEnabled && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Video className="w-4 h-4" />
              Visual
            </h3>

            <div className="space-y-2">
              <Label htmlFor="avatar-url" className="text-sm">
                Avatar URL
              </Label>
              <Input
                id="avatar-url"
                value={localSettings.avatarUrl}
                onChange={(e) => updateSetting('avatarUrl', e.target.value)}
                placeholder="Enter avatar image URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visual-style" className="text-sm">
                Visual Style
              </Label>
              <Select
                value={localSettings.visualStyle}
                onValueChange={(value) => updateSetting('visualStyle', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {visualStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar-size" className="text-sm">
                Size
              </Label>
              <Select
                value={localSettings.size}
                onValueChange={(value) => updateSetting('size', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background-color" className="text-sm">
                Background Color
              </Label>
              <div className="flex gap-2">
                <Input
                  id="background-color"
                  value={localSettings.backgroundColor}
                  onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
                <div
                  className="w-10 h-10 rounded border"
                  style={{ backgroundColor: localSettings.backgroundColor }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 