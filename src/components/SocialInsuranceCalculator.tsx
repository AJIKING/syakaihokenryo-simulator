'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calculator, Coins, Building2 } from 'lucide-react';
import { InsuranceResults } from './InsuranceResults';

interface CalculationResult {
  grossSalary: number;
  // 労働者負担分
  healthInsurance: number;
  pensionInsurance: number;
  employmentInsurance: number;
  longTermCareInsurance: number;
  totalInsurance: number;
  // 会社負担分
  companyHealthInsurance: number;
  companyPensionInsurance: number;
  companyEmploymentInsurance: number;
  companyLongTermCareInsurance: number;
  totalCompanyInsurance: number;
  // 保険料率情報
  rates: {
    healthRate: number;
    pensionRate: number;
    employmentRateEmployee: number;
    employmentRateCompany: number;
    longTermCareRate: number;
  };
  netSalary: number;
  prefecture: string;
  age: number;
}

const prefectures = [
  { value: 'hokkaido', label: '北海道', healthRate: 10.21 },
  { value: 'aomori', label: '青森県', healthRate: 9.49 },
  { value: 'iwate', label: '岩手県', healthRate: 9.63 },
  { value: 'miyagi', label: '宮城県', healthRate: 10.01 },
  { value: 'akita', label: '秋田県', healthRate: 9.85 },
  { value: 'yamagata', label: '山形県', healthRate: 9.84 },
  { value: 'fukushima', label: '福島県', healthRate: 9.59 },
  { value: 'ibaraki', label: '茨城県', healthRate: 9.66 },
  { value: 'tochigi', label: '栃木県', healthRate: 9.79 },
  { value: 'gunma', label: '群馬県', healthRate: 9.81 },
  { value: 'saitama', label: '埼玉県', healthRate: 9.78 },
  { value: 'chiba', label: '千葉県', healthRate: 9.77 },
  { value: 'tokyo', label: '東京都', healthRate: 9.98 },
  { value: 'kanagawa', label: '神奈川県', healthRate: 10.02 },
  { value: 'niigata', label: '新潟県', healthRate: 9.35 },
  { value: 'toyama', label: '富山県', healthRate: 9.62 },
  { value: 'ishikawa', label: '石川県', healthRate: 9.94 },
  { value: 'fukui', label: '福井県', healthRate: 10.07 },
  { value: 'yamanashi', label: '山梨県', healthRate: 9.94 },
  { value: 'nagano', label: '長野県', healthRate: 9.55 },
  { value: 'gifu', label: '岐阜県', healthRate: 9.91 },
  { value: 'shizuoka', label: '静岡県', healthRate: 9.85 },
  { value: 'aichi', label: '愛知県', healthRate: 10.02 },
  { value: 'mie', label: '三重県', healthRate: 9.94 },
  { value: 'shiga', label: '滋賀県', healthRate: 9.89 },
  { value: 'kyoto', label: '京都府', healthRate: 10.13 },
  { value: 'osaka', label: '大阪府', healthRate: 10.34 },
  { value: 'hyogo', label: '兵庫県', healthRate: 10.18 },
  { value: 'nara', label: '奈良県', healthRate: 10.22 },
  { value: 'wakayama', label: '和歌山県', healthRate: 10.00 },
  { value: 'tottori', label: '鳥取県', healthRate: 9.68 },
  { value: 'shimane', label: '島根県', healthRate: 9.92 },
  { value: 'okayama', label: '岡山県', healthRate: 10.02 },
  { value: 'hiroshima', label: '広島県', healthRate: 9.95 },
  { value: 'yamaguchi', label: '山口県', healthRate: 10.20 },
  { value: 'tokushima', label: '徳島県', healthRate: 10.19 },
  { value: 'kagawa', label: '香川県', healthRate: 10.33 },
  { value: 'ehime', label: '愛媛県', healthRate: 10.03 },
  { value: 'kochi', label: '高知県', healthRate: 9.89 },
  { value: 'fukuoka', label: '福岡県', healthRate: 10.35 },
  { value: 'saga', label: '佐賀県', healthRate: 10.42 },
  { value: 'nagasaki', label: '長崎県', healthRate: 10.17 },
  { value: 'kumamoto', label: '熊本県', healthRate: 10.30 },
  { value: 'oita', label: '大分県', healthRate: 10.25 },
  { value: 'miyazaki', label: '宮崎県', healthRate: 9.85 },
  { value: 'kagoshima', label: '鹿児島県', healthRate: 10.13 },
  { value: 'okinawa', label: '沖縄県', healthRate: 9.52 },
];

export function SocialInsuranceCalculator() {
  const [netSalary, setNetSalary] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [prefecture, setPrefecture] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateInsurance = () => {
    const netAmount = parseFloat(netSalary);
    const userAge = parseInt(age);
    
    if (!netAmount || !userAge || !prefecture) {
      alert('すべての項目を入力してください');
      return;
    }

    // 選択された都道府県の健康保険料率を取得
    const selectedPrefecture = prefectures.find(p => p.value === prefecture);
    const healthRate = selectedPrefecture?.healthRate || 10.00;

    // 保険料率
    const pensionRate = 18.3; // 厚生年金保険料率
    const employmentRateEmployee = 0.5; // 雇用保険料率（労働者負担分）
    const employmentRateCompany = 0.85; // 雇用保険料率（会社負担分）
    const longTermCareRate = userAge >= 40 ? 1.64 : 0; // 介護保険料率

    // 総保険料率（労働者負担分）
    const totalRate = (healthRate / 2) + (pensionRate / 2) + employmentRateEmployee + (longTermCareRate / 2);

    // 所得税と住民税の概算（簡略化）
    const taxRate = 0.2; // 約20%として簡略化

    // 手取りから総支給額を逆算
    const grossSalary = netAmount / (1 - (totalRate / 100) - taxRate);

    // 労働者負担分を計算
    const healthInsurance = Math.round(grossSalary * (healthRate / 2) / 100);
    const pensionInsurance = Math.round(grossSalary * (pensionRate / 2) / 100);
    const employmentInsurance = Math.round(grossSalary * employmentRateEmployee / 100);
    const longTermCareInsurance = userAge >= 40 ? Math.round(grossSalary * (longTermCareRate / 2) / 100) : 0;

    // 会社負担分を計算
    const companyHealthInsurance = Math.round(grossSalary * (healthRate / 2) / 100);
    const companyPensionInsurance = Math.round(grossSalary * (pensionRate / 2) / 100);
    const companyEmploymentInsurance = Math.round(grossSalary * employmentRateCompany / 100);
    const companyLongTermCareInsurance = userAge >= 40 ? Math.round(grossSalary * (longTermCareRate / 2) / 100) : 0;

    const totalInsurance = healthInsurance + pensionInsurance + employmentInsurance + longTermCareInsurance;
    const totalCompanyInsurance = companyHealthInsurance + companyPensionInsurance + companyEmploymentInsurance + companyLongTermCareInsurance;

    setResult({
      grossSalary: Math.round(grossSalary),
      healthInsurance,
      pensionInsurance,
      employmentInsurance,
      longTermCareInsurance,
      totalInsurance,
      companyHealthInsurance,
      companyPensionInsurance,
      companyEmploymentInsurance,
      companyLongTermCareInsurance,
      totalCompanyInsurance,
      rates: {
        healthRate,
        pensionRate,
        employmentRateEmployee,
        employmentRateCompany,
        longTermCareRate
      },
      netSalary: netAmount,
      prefecture: selectedPrefecture?.label || 'その他',
      age: userAge
    });
  };

  const reset = () => {
    setNetSalary('');
    setAge('');
    setPrefecture('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg">
            <Calculator className="size-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            社会保険料計算シミュレーター
          </h1>
        </div>
        <p className="text-muted-foreground">
          手取り給料から毎月の社会保険料を計算します
        </p>
      </div>


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
              <Coins className="size-5 text-white" />
            </div>
            <span className="text-foreground">
              給料情報の入力
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="netSalary">手取り月給（円）</Label>
              <Input
                id="netSalary"
                type="number"
                placeholder="例: 300000"
                value={netSalary}
                onChange={(e) => setNetSalary(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">年齢</Label>
              <Input
                id="age"
                type="number"
                placeholder="例: 30"
                min="18"
                max="70"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prefecture">都道府県</Label>
              <Select value={prefecture} onValueChange={setPrefecture}>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {prefectures.map((pref) => (
                    <SelectItem key={pref.value} value={pref.value}>
                      {pref.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={calculateInsurance} 
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg"
            >
              <Calculator className="size-4 mr-2" />
              計算する
            </Button>
            <Button variant="outline" onClick={reset}>
              リセット
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && <InsuranceResults result={result} />}

      <Card>
         <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
              <Building2 className="size-5 text-white" />
            </div>
            <span className="text-foreground">
              注意事項
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• この計算は簡略化されたもので、実際の保険料とは異なる場合があります</p>
          <p>• 所得税・住民税は概算値を使用しています</p>
          <p>• 賞与や各種手当は考慮されていません</p>
          <p>• 詳細な計算については、お勤め先の人事部門や年金事務所にご相談ください</p>
        </CardContent>
      </Card>
    </div>
  );
}