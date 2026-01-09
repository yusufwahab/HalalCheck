import React, { useState } from 'react';
import { Bell, Shield, User, Globe, Lock, Eye, Save, Check, Building2, Calculator, Star } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      zakatReminders: true,
      halalAlerts: true,
      scholarUpdates: true,
      marketingEmails: false,
      weeklyReports: true,
      whatsappNotifications: true,
      smsNotifications: false,
      emailNotifications: true
    },
    islamic: {
      madhab: 'hanafi',
      zakatFrequency: 'annual',
      prayerReminders: true,
      halalStrictness: 'moderate'
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: '30',
      passwordExpiry: '90'
    },
    productPermissions: {
      'Amana Mutual Funds': 'always_trust',
      'Wahed Invest': 'always_trust',
      'Islamic Bank Products': 'always_ask',
      'Conventional Banks': 'always_review',
      'Crypto Investments': 'always_review',
      'Mixed Funds': 'always_review'
    }
  });

  const [saved, setSaved] = useState(false);

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleIslamicChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      islamic: {
        ...prev.islamic,
        [key]: value
      }
    }));
  };

  const handleSecurityChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };

  const handleProductPermissionChange = (product, permission) => {
    setSettings(prev => ({
      ...prev,
      productPermissions: {
        ...prev.productPermissions,
        [product]: permission
      }
    }));
  };

  const handleSave = () => {
    // Simulate saving
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            <span className="text-green-600">Settings</span>
          </h1>
          <p className="text-gray-600">
            Manage your Islamic finance preferences and account settings
          </p>
        </div>

        <div className="space-y-8">
          {/* Islamic Preferences */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-xl">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Islamic Preferences</h2>
                <p className="text-gray-600">Configure your Islamic finance and religious settings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Madhab (School of Thought)
                </label>
                <select
                  value={settings.islamic.madhab}
                  onChange={(e) => handleIslamicChange('madhab', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="hanafi">Hanafi</option>
                  <option value="maliki">Maliki</option>
                  <option value="shafi">Shafi'i</option>
                  <option value="hanbali">Hanbali</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Zakat Calculation Frequency
                </label>
                <select
                  value={settings.islamic.zakatFrequency}
                  onChange={(e) => handleIslamicChange('zakatFrequency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="annual">Annual (Recommended)</option>
                  <option value="monthly">Monthly Tracking</option>
                  <option value="quarterly">Quarterly Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Halal Strictness Level
                </label>
                <select
                  value={settings.islamic.halalStrictness}
                  onChange={(e) => handleIslamicChange('halalStrictness', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="strict">Strict (0% tolerance)</option>
                  <option value="moderate">Moderate (AAOIFI standards)</option>
                  <option value="lenient">Lenient (5% tolerance)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Prayer Time Reminders</h3>
                  <p className="text-sm text-gray-600">Get notified for daily prayers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.islamic.prayerReminders}
                    onChange={() => handleIslamicChange('prayerReminders', !settings.islamic.prayerReminders)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Notification Preferences</h2>
                <p className="text-gray-600">Choose what notifications you want to receive</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Zakat Reminders</h3>
                  <p className="text-sm text-gray-600">Get notified when zakat payments are due</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.zakatReminders}
                    onChange={() => handleNotificationChange('zakatReminders')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Halal Alerts</h3>
                  <p className="text-sm text-gray-600">Notifications about product compliance changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.halalAlerts}
                    onChange={() => handleNotificationChange('halalAlerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Scholar Updates</h3>
                  <p className="text-sm text-gray-600">New fatwas and scholarly opinions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.scholarUpdates}
                    onChange={() => handleNotificationChange('scholarUpdates')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Weekly Reports</h3>
                  <p className="text-sm text-gray-600">Weekly summary of your halal portfolio</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.weeklyReports}
                    onChange={() => handleNotificationChange('weeklyReports')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={() => handleNotificationChange('emailNotifications')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Product Trust Levels */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Product Trust Levels</h2>
                <p className="text-gray-600">Set default trust levels for different product categories</p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(settings.productPermissions).map(([product, permission]) => (
                <div key={product} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">{product}</h3>
                    <p className="text-sm text-gray-600">Default analysis approach</p>
                  </div>
                  <select
                    value={permission}
                    onChange={(e) => handleProductPermissionChange(product, e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="always_trust">Always Trust</option>
                    <option value="always_ask">Always Ask</option>
                    <option value="always_review">Always Review</option>
                    <option value="never_trust">Never Trust</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-xl">
                <Lock className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Security Settings</h2>
                <p className="text-gray-600">Manage your account security preferences</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={() => handleSecurityChange('twoFactorAuth', !settings.security.twoFactorAuth)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Session Timeout (minutes)
                </label>
                <select
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Login Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.loginAlerts}
                    onChange={() => handleSecurityChange('loginAlerts', !settings.security.loginAlerts)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-200 ${
                saved
                  ? 'bg-green-600 text-white'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {saved ? (
                <>
                  <Check className="h-5 w-5" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;