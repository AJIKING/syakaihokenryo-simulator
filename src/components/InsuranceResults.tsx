'use client';

import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, Heart, Shield, Briefcase, Users, Building, Percent, User } from 'lucide-react';

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

interface InsuranceResultsProps {
  result: CalculationResult;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function InsuranceResults({ result }: InsuranceResultsProps) {
  const pieData = [
    { name: '健康保険', value: result.healthInsurance, icon: Heart },
    { name: '厚生年金', value: result.pensionInsurance, icon: Shield },
    { name: '雇用保険', value: result.employmentInsurance, icon: Briefcase },
    ...(result.longTermCareInsurance > 0 ? [{ name: '介護保険', value: result.longTermCareInsurance, icon: Users }] : [])
  ];

  const comparisonData = [
    {
      name: '健康保険',
      employee: result.healthInsurance,
      company: result.companyHealthInsurance,
      icon: Heart
    },
    {
      name: '厚生年金',
      employee: result.pensionInsurance,
      company: result.companyPensionInsurance,
      icon: Shield
    },
    {
      name: '雇用保険',
      employee: result.employmentInsurance,
      company: result.companyEmploymentInsurance,
      icon: Briefcase
    },
    ...(result.longTermCareInsurance > 0 ? [{
      name: '介護保険',
      employee: result.longTermCareInsurance,
      company: result.companyLongTermCareInsurance,
      icon: Users
    }] : [])
  ];

  const barData = [
    {
      name: '総支給額',
      amount: result.grossSalary,
      type: 'gross'
    },
    {
      name: '労働者負担',
      amount: result.totalInsurance,
      type: 'employee'
    },
    {
      name: '会社負担',
      amount: result.totalCompanyInsurance,
      type: 'company'
    },
    {
      name: '手取り額',
      amount: result.netSalary,
      type: 'net'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
              <TrendingUp className="size-5 text-white" />
            </div>
            <span className="text-foreground">
              計算結果
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 border rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">推定総支給額</p>
              <p className="text-2xl text-blue-700">{formatCurrency(result.grossSalary)}</p>
            </div>
            <div className="text-center p-4 bg-red-50 border rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">労働者負担</p>
              <p className="text-2xl text-red-600">{formatCurrency(result.totalInsurance)}</p>
            </div>
            <div className="text-center p-4 bg-orange-50 border rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">会社負担</p>
              <p className="text-2xl text-orange-600">{formatCurrency(result.totalCompanyInsurance)}</p>
            </div>
            <div className="text-center p-4 bg-green-50 border rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground">手取り額</p>
              <p className="text-2xl text-green-600">{formatCurrency(result.netSalary)}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            {/* 都道府県 */}
            <div className="flex items-center gap-1 px-3 py-2 bg-muted rounded-lg border">
              <strong className="text-foreground">都道府県:</strong>
              <span>{result.prefecture}</span>
            </div>

            {/* 年齢 */}
            <div className="flex items-center gap-1 px-3 py-2 bg-muted rounded-lg border">
              <strong className="text-foreground">年齢:</strong>
              <span>{result.age}歳</span>
            </div>

            {/* 社会保険料合計 */}
            <div className="flex items-center gap-1 px-3 py-2 bg-muted rounded-lg border">
              <strong className="text-foreground">社会保険料合計:</strong>
              <span>{formatCurrency(result.totalInsurance + result.totalCompanyInsurance)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakdown">内訳</TabsTrigger>
          <TabsTrigger value="comparison">負担比較</TabsTrigger>
          <TabsTrigger value="rates">保険料率</TabsTrigger>
          <TabsTrigger value="charts">グラフ</TabsTrigger>
        </TabsList>

         <TabsContent value="breakdown" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>年間の概算</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 border rounded-lg">
                    <p className="text-sm text-muted-foreground">年間総支給額</p>
                    <p className="text-xl text-blue-700">{formatCurrency(result.grossSalary * 12)}</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 border rounded-lg">
                    <p className="text-sm text-muted-foreground">年間労働者負担</p>
                    <p className="text-xl text-red-600">{formatCurrency(result.totalInsurance * 12)}</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 border rounded-lg">
                    <p className="text-sm text-muted-foreground">年間会社負担</p>
                    <p className="text-xl text-orange-600">{formatCurrency(result.totalCompanyInsurance * 12)}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 border rounded-lg">
                    <p className="text-sm text-muted-foreground">年間手取り額</p>
                    <p className="text-xl text-green-600">{formatCurrency(result.netSalary * 12)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          <div className="flex flex-col md:flex-row gap-4 w-full">
              <Card className="flex-1 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                    <User className="size-5 text-white" />
                  </div>
                  <span>労働者負担</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {comparisonData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <item.icon className="size-4 text-cyan-600" />
                      <span>{item.name}</span>
                    </div>
                    <Badge>{formatCurrency(item.employee)}</Badge>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span>合計</span>
                    <Badge className="bg-cyan-600 text-white">{formatCurrency(result.totalInsurance)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg">
                    <Building className="size-5 text-white" />
                  </div>
                    <span>会社負担</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <item.icon className="size-4 text-orange-600" />
                        <span>{item.name}</span>
                      </div>
                      <Badge>{formatCurrency(item.company)}</Badge>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span>合計</span>
                      <Badge className="bg-orange-600 text-white">{formatCurrency(result.totalCompanyInsurance)}</Badge>
                    </div>
                  </div>
                </CardContent>
            </Card>
            </div>
            </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>労働者負担 と 会社負担</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="employee" name="労働者負担" fill="#0088FE" />
                  <Bar dataKey="company" name="会社負担" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
                  <Percent className="size-5 text-white" />
                </div>
                <span>適用保険料率</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="size-4 text-blue-500" />
                      <span>健康保険料率</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>全体:</span>
                        <span>{formatPercent(result.rates.healthRate)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>労働者負担:</span>
                        <span>{formatPercent(result.rates.healthRate / 2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>会社負担:</span>
                        <span>{formatPercent(result.rates.healthRate / 2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="size-4 text-green-500" />
                      <span>厚生年金保険料率</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>全体:</span>
                        <span>{formatPercent(result.rates.pensionRate)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>労働者負担:</span>
                        <span>{formatPercent(result.rates.pensionRate / 2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>会社負担:</span>
                        <span>{formatPercent(result.rates.pensionRate / 2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="size-4 text-yellow-500" />
                      <span>雇用保険料率</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>全体:</span>
                        <span>{formatPercent(result.rates.employmentRateEmployee + result.rates.employmentRateCompany)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>労働者負担:</span>
                        <span>{formatPercent(result.rates.employmentRateEmployee)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>会社負担:</span>
                        <span>{formatPercent(result.rates.employmentRateCompany)}</span>
                      </div>
                    </div>
                  </div>

                  {result.rates.longTermCareRate > 0 && (
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="size-4 text-purple-500" />
                        <span>介護保険料率</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>全体:</span>
                          <span>{formatPercent(result.rates.longTermCareRate)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>労働者負担:</span>
                          <span>{formatPercent(result.rates.longTermCareRate / 2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>会社負担:</span>
                          <span>{formatPercent(result.rates.longTermCareRate / 2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>労働者負担の割合</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>給与の構成</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="amount" fill="#8884d8">
                      {barData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.type === 'gross' ? '#0088FE' : 
                            entry.type === 'employee' ? '#FF8042' : 
                            entry.type === 'company' ? '#FFA500' :
                            '#00C49F'
                          } 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}