import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  image: string;
  thickness: string;
  wearClass: string;
  inStock: boolean;
  country?: string;
  wood?: string;
  width?: number;
  length?: number;
  hasPad?: boolean;
  pattern?: string;
  bevel?: string;
  brushed?: boolean;
  finish?: string;
  sheen?: string;
  shade?: string;
  color?: string;
  selection?: string;
  waterproof?: boolean;
  underfloorHeating?: boolean;
}

const categories = [
  { id: 'all', name: 'Все товары', icon: 'LayoutGrid' },
  { id: 'laminate', name: 'Ламинат', icon: 'Grid3x3' },
  { id: 'vinyl', name: 'Кварц винил', icon: 'Square' },
  { id: 'parquet', name: 'Паркетная доска', icon: 'Layers' },
  { id: 'engineered', name: 'Инженерная доска', icon: 'PanelTop' },
  { id: 'solid', name: 'Массивная доска', icon: 'Box' },
  { id: 'cork', name: 'Пробковое покрытие', icon: 'Circle' },
  { id: 'modular', name: 'Модульный паркет', icon: 'Grid2x2' },
  { id: 'piece', name: 'Штучный паркет', icon: 'RectangleVertical' },
  { id: 'underlay', name: 'Подложка', icon: 'Minus' },
  { id: 'baseboard', name: 'Плинтус', icon: 'RectangleHorizontal' },
  { id: 'glue', name: 'Клей для паркета', icon: 'Droplet' },
  { id: 'varnish', name: 'Паркетный лак', icon: 'PaintBucket' },
  { id: 'oil', name: 'Масло для паркета', icon: 'Droplets' },
  { id: 'primer', name: 'Грунтовка для паркета', icon: 'Brush' },
  { id: 'care', name: 'Средства по уходу', icon: 'Sparkles' },
  { id: 'sealant', name: 'Герметик для паркета', icon: 'Cylinder' },
  { id: 'tools', name: 'Инструменты для укладки', icon: 'Wrench' },
  { id: 'plywood', name: 'Фанера', icon: 'FileStack' },
  { id: 'putty', name: 'Шпаклёвка по дереву', icon: 'Paintbrush' }
];

const manufacturers = ['Tarkett', 'Quick-Step', 'Kronospan', 'Barlinek', 'Pergo', 'Egger', 'ADESIV', 'BERGER-SIEDLE', 'LOBA'];

const countries = [
  'Австрия', 'Беларусь', 'Бельгия', 'Германия', 'Испания', 'Китай', 
  'Норвегия', 'Польша', 'Россия', 'Турция', 'Франция'
];

const woodTypes = [
  'Дуб', 'Ясень', 'Бук', 'Бамбук', 'Венге', 'Тик', 'Палисандр', 'Орех', 
  'Мербау', 'Акация', 'Клён', 'Берёза', 'Ироко', 'Вишня', 'Вяз', 'Сосна', 'Ятоба'
];

const wearClasses = ['31 класс', '32 класс', '33 класс', '34 класс'];

const patterns = [
  'Однополосный', 'Двухполосный', 'Трёхполосный', 'Многополосный', 
  'Ёлочкой', 'С рисунком', 'Под плитку, камень'
];

const bevels = ['Фаска 4v', 'Минифаска 4v', 'Фаска 2v', 'Без фаски'];

const sheens = ['Матовый', 'Полуматовый (стандартный)', 'Глянцевый', 'Полуглянцевый'];

const shades = ['Светлый оттенок', 'Средний оттенок', 'Тёмный оттенок'];

const colors = [
  'белые / бежевые оттенки цвета', 'Коричневые / красные оттенки цвета',
  'Натуральные оттенки цвета', 'Серые оттенки цвета', 'Чёрные / тёмные оттенки цвета'
];

const selections = ['Кантри', 'Рустик', 'Натур', 'Селект'];

const products: Product[] = [
  {
    id: 1,
    name: 'Паркетная доска Дуб Натур',
    category: 'parquet',
    manufacturer: 'Tarkett',
    price: 3250,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/058a28e9-bc95-4823-b429-3efa8abd586e.jpg',
    thickness: '14 мм',
    wearClass: '32 класс',
    inStock: true
  },
  {
    id: 2,
    name: 'Ламинат Quick-Step Impressive',
    category: 'laminate',
    manufacturer: 'Quick-Step',
    price: 1890,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/d158a67a-f436-4afb-841b-32ee2b6e47b1.jpg',
    thickness: '8 мм',
    wearClass: '33 класс',
    inStock: true
  },
  {
    id: 3,
    name: 'Виниловый пол Art Tile',
    category: 'vinyl',
    manufacturer: 'Tarkett',
    price: 2150,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/439d699e-9656-4612-b3e0-dbd98d0df771.jpg',
    thickness: '3 мм',
    wearClass: '34 класс',
    inStock: true
  },
  {
    id: 4,
    name: 'Ламинат Kronospan Castello',
    category: 'laminate',
    manufacturer: 'Kronospan',
    price: 1450,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/058a28e9-bc95-4823-b429-3efa8abd586e.jpg',
    thickness: '8 мм',
    wearClass: '32 класс',
    inStock: true
  },
  {
    id: 5,
    name: 'Паркетная доска Barlinek Ясень',
    category: 'parquet',
    manufacturer: 'Barlinek',
    price: 4200,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/d158a67a-f436-4afb-841b-32ee2b6e47b1.jpg',
    thickness: '14 мм',
    wearClass: '33 класс',
    inStock: false
  },
  {
    id: 6,
    name: 'Линолеум Tarkett Grand',
    category: 'linoleum',
    manufacturer: 'Tarkett',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/439d699e-9656-4612-b3e0-dbd98d0df771.jpg',
    thickness: '2.5 мм',
    wearClass: '31 класс',
    inStock: true
  },
  {
    id: 7,
    name: 'Ламинат Egger Pro Classic',
    category: 'laminate',
    manufacturer: 'Egger',
    price: 1650,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/058a28e9-bc95-4823-b429-3efa8abd586e.jpg',
    thickness: '8 мм',
    wearClass: '32 класс',
    inStock: true
  },
  {
    id: 8,
    name: 'Паркетная доска Дуб Рустик',
    category: 'parquet',
    manufacturer: 'Tarkett',
    price: 2890,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/d158a67a-f436-4afb-841b-32ee2b6e47b1.jpg',
    thickness: '14 мм',
    wearClass: '31 класс',
    inStock: true
  }
];

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedWood, setSelectedWood] = useState<string[]>([]);
  const [selectedWearClass, setSelectedWearClass] = useState<string[]>([]);
  const [thicknessRange, setThicknessRange] = useState<[string, string]>(['', '']);
  const [widthRange, setWidthRange] = useState<[string, string]>(['', '']);
  const [lengthRange, setLengthRange] = useState<[string, string]>(['', '']);
  const [hasPad, setHasPad] = useState<string>('all');
  const [selectedPattern, setSelectedPattern] = useState<string[]>([]);
  const [selectedBevel, setSelectedBevel] = useState<string[]>([]);
  const [brushed, setBrushed] = useState<string>('all');
  const [selectedSheen, setSelectedSheen] = useState<string[]>([]);
  const [selectedShade, setSelectedShade] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedSelection, setSelectedSelection] = useState<string[]>([]);
  const [waterproof, setWaterproof] = useState<string>('all');
  const [underfloorHeating, setUnderfloorHeating] = useState<string>('all');
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roomLength, setRoomLength] = useState<string>('');
  const [roomWidth, setRoomWidth] = useState<string>('');
  const [showCalculator, setShowCalculator] = useState(false);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const manufacturerMatch = selectedManufacturers.length === 0 || selectedManufacturers.includes(product.manufacturer);
    const countryMatch = selectedCountries.length === 0 || (product.country && selectedCountries.includes(product.country));
    const woodMatch = selectedWood.length === 0 || (product.wood && selectedWood.includes(product.wood));
    const wearClassMatch = selectedWearClass.length === 0 || selectedWearClass.includes(product.wearClass);
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const thicknessMin = thicknessRange[0] ? parseFloat(thicknessRange[0]) : 0;
    const thicknessMax = thicknessRange[1] ? parseFloat(thicknessRange[1]) : Infinity;
    const thicknessVal = parseFloat(product.thickness);
    const thicknessMatch = thicknessVal >= thicknessMin && thicknessVal <= thicknessMax;
    
    return categoryMatch && priceMatch && manufacturerMatch && countryMatch && 
           woodMatch && wearClassMatch && thicknessMatch && searchMatch;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const calculateArea = () => {
    const length = parseFloat(roomLength);
    const width = parseFloat(roomWidth);
    if (length && width) {
      return (length * width * 1.1).toFixed(2);
    }
    return '0';
  };

  const toggleManufacturer = (manufacturer: string) => {
    if (selectedManufacturers.includes(manufacturer)) {
      setSelectedManufacturers(selectedManufacturers.filter(m => m !== manufacturer));
    } else {
      setSelectedManufacturers([...selectedManufacturers, manufacturer]);
    }
  };

  const toggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const toggleWood = (wood: string) => {
    if (selectedWood.includes(wood)) {
      setSelectedWood(selectedWood.filter(w => w !== wood));
    } else {
      setSelectedWood([...selectedWood, wood]);
    }
  };

  const toggleWearClass = (wearClass: string) => {
    if (selectedWearClass.includes(wearClass)) {
      setSelectedWearClass(selectedWearClass.filter(w => w !== wearClass));
    } else {
      setSelectedWearClass([...selectedWearClass, wearClass]);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 10000]);
    setSelectedManufacturers([]);
    setSelectedCountries([]);
    setSelectedWood([]);
    setSelectedWearClass([]);
    setThicknessRange(['', '']);
    setWidthRange(['', '']);
    setLengthRange(['', '']);
    setHasPad('all');
    setSelectedPattern([]);
    setSelectedBevel([]);
    setBrushed('all');
    setSelectedSheen([]);
    setSelectedShade([]);
    setSelectedColor([]);
    setSelectedSelection([]);
    setWaterproof('all');
    setUnderfloorHeating('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold font-heading text-primary">Главпаркет</h1>
              <nav className="hidden md:flex gap-6">
                <button 
                  onClick={() => setShowCalculator(true)}
                  className="text-sm font-medium hover:text-accent transition-colors"
                >
                  Калькулятор
                </button>
                <a href="#services" className="text-sm font-medium hover:text-accent transition-colors">Услуги</a>
                <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">О компании</a>
                <a href="#contacts" className="text-sm font-medium hover:text-accent transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+74951234567" className="hidden md:flex items-center gap-2 text-sm font-medium">
                <Icon name="Phone" size={18} />
                +7 (495) 123-45-67
              </a>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.price} ₽/м²</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto"
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Итого:</span>
                            <span>{cartTotal.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full mt-4" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <Sheet open={showCalculator} onOpenChange={setShowCalculator}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Калькулятор расчета</SheetTitle>
          </SheetHeader>
          <div className="mt-8">
            <Tabs defaultValue="area">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="area">Расчет площади</TabsTrigger>
                <TabsTrigger value="cost">Расчет стоимости</TabsTrigger>
              </TabsList>
              
              <TabsContent value="area" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Длина помещения, м</label>
                  <Input 
                    type="number" 
                    placeholder="Например: 5.5"
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ширина помещения, м</label>
                  <Input 
                    type="number" 
                    placeholder="Например: 4.2"
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(e.target.value)}
                  />
                </div>
                <div className="bg-accent/10 p-6 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Необходимое количество материала (с запасом 10%)</p>
                  <p className="text-4xl font-bold text-accent">{calculateArea()} м²</p>
                </div>
              </TabsContent>

              <TabsContent value="cost" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Площадь, м²</label>
                  <Input type="number" placeholder="Введите площадь" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Цена за м², ₽</label>
                  <Input type="number" placeholder="Введите цену" />
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <Checkbox id="install" />
                    <span className="text-sm">Включить стоимость укладки (от 350 ₽/м²)</span>
                  </label>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Рассчитать стоимость
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      <section className="py-8 bg-gradient-to-br from-primary/5 to-accent/5 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-primary">
              Напольные покрытия премиум качества
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Широкий выбор паркета, ламината, винила и линолеума от ведущих производителей
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <Icon name="CheckCircle2" size={16} className="mr-2" />
                Гарантия качества
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <Icon name="Truck" size={16} className="mr-2" />
                Доставка по Москве
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <Icon name="Hammer" size={16} className="mr-2" />
                Профессиональная укладка
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category, index) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="h-auto py-4 flex flex-col items-center gap-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon name={category.icon as any} size={24} />
                <span className="text-xs font-medium text-center">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <Card className="sticky top-20 max-h-[calc(100vh-100px)]">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Icon name="SlidersHorizontal" size={18} />
                      Подбор по параметрам
                    </h4>
                  </div>

                  <div className="overflow-y-auto max-h-[calc(100vh-280px)] pr-2 space-y-6" style={{ scrollbarWidth: 'thin' }}>
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Бренд</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                        {manufacturers.map(manufacturer => (
                          <div key={manufacturer} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`brand-${manufacturer}`}
                              checked={selectedManufacturers.includes(manufacturer)}
                              onCheckedChange={() => toggleManufacturer(manufacturer)}
                            />
                            <label htmlFor={`brand-${manufacturer}`} className="text-sm cursor-pointer">
                              {manufacturer}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Страна производителя</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                        {countries.map(country => (
                          <div key={country} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`country-${country}`}
                              checked={selectedCountries.includes(country)}
                              onCheckedChange={() => toggleCountry(country)}
                            />
                            <label htmlFor={`country-${country}`} className="text-sm cursor-pointer">
                              {country}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Порода дерева</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                        {woodTypes.map(wood => (
                          <div key={wood} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`wood-${wood}`}
                              checked={selectedWood.includes(wood)}
                              onCheckedChange={() => toggleWood(wood)}
                            />
                            <label htmlFor={`wood-${wood}`} className="text-sm cursor-pointer">
                              {wood}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Класс износостойкости</h4>
                      <div className="space-y-2">
                        {wearClasses.map(wc => (
                          <div key={wc} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`wear-${wc}`}
                              checked={selectedWearClass.includes(wc)}
                              onCheckedChange={() => toggleWearClass(wc)}
                            />
                            <label htmlFor={`wear-${wc}`} className="text-sm cursor-pointer">
                              {wc}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Размер доски - толщина, мм</h4>
                      <div className="flex gap-2">
                        <Input 
                          type="number" 
                          placeholder="От"
                          value={thicknessRange[0]}
                          onChange={(e) => setThicknessRange([e.target.value, thicknessRange[1]])}
                          className="text-sm"
                        />
                        <Input 
                          type="number" 
                          placeholder="До"
                          value={thicknessRange[1]}
                          onChange={(e) => setThicknessRange([thicknessRange[0], e.target.value])}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Размер доски - ширина, мм</h4>
                      <div className="flex gap-2">
                        <Input 
                          type="number" 
                          placeholder="От"
                          value={widthRange[0]}
                          onChange={(e) => setWidthRange([e.target.value, widthRange[1]])}
                          className="text-sm"
                        />
                        <Input 
                          type="number" 
                          placeholder="До"
                          value={widthRange[1]}
                          onChange={(e) => setWidthRange([widthRange[0], e.target.value])}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Размер доски - длина, мм</h4>
                      <div className="flex gap-2">
                        <Input 
                          type="number" 
                          placeholder="От"
                          value={lengthRange[0]}
                          onChange={(e) => setLengthRange([e.target.value, lengthRange[1]])}
                          className="text-sm"
                        />
                        <Input 
                          type="number" 
                          placeholder="До"
                          value={lengthRange[1]}
                          onChange={(e) => setLengthRange([lengthRange[0], e.target.value])}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Цена, ₽/м²</h4>
                      <div className="flex gap-2 mb-3">
                        <Input 
                          type="number" 
                          placeholder="От"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="text-sm"
                        />
                        <Input 
                          type="number" 
                          placeholder="До"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="text-sm"
                        />
                      </div>
                      <Slider 
                        min={0}
                        max={10000}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-2"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Влагостойкость покрытий пола</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="waterproof-yes"
                            checked={waterproof === 'yes'}
                            onCheckedChange={() => setWaterproof(waterproof === 'yes' ? 'all' : 'yes')}
                          />
                          <label htmlFor="waterproof-yes" className="text-sm cursor-pointer">Да</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="waterproof-no"
                            checked={waterproof === 'no'}
                            onCheckedChange={() => setWaterproof(waterproof === 'no' ? 'all' : 'no')}
                          />
                          <label htmlFor="waterproof-no" className="text-sm cursor-pointer">Нет</label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Подходит для тёплого пола</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="heating-yes"
                            checked={underfloorHeating === 'yes'}
                            onCheckedChange={() => setUnderfloorHeating(underfloorHeating === 'yes' ? 'all' : 'yes')}
                          />
                          <label htmlFor="heating-yes" className="text-sm cursor-pointer">Применяется</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t space-y-2">
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Icon name="Check" size={16} className="mr-2" />
                      Показать
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={resetFilters}
                    >
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Сбросить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <div className="mb-6 flex gap-3">
                <div className="relative flex-1">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Поиск по товарам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={() => setShowCalculator(true)}>
                  <Icon name="Calculator" size={18} className="mr-2" />
                  Калькулятор
                </Button>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Найдено товаров: <span className="font-semibold text-foreground">{filteredProducts.length}</span>
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden hover:shadow-lg transition-all animate-scale-in group cursor-pointer"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {!product.inStock && (
                        <Badge className="absolute top-2 right-2 bg-destructive">
                          Под заказ
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {categories.find(c => c.id === product.category)?.name}
                      </Badge>
                      <h4 className="font-semibold mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h4>
                      <div className="space-y-1 text-xs text-muted-foreground mb-3">
                        <p>{product.manufacturer}</p>
                        <p>Толщина: {product.thickness} • {product.wearClass}</p>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">{product.price}</span>
                          <span className="text-sm text-muted-foreground ml-1">₽/м²</span>
                        </div>
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="bg-accent hover:bg-accent/90"
                        >
                          <Icon name="ShoppingCart" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                  <Icon name="PackageSearch" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground mb-2">Товары не найдены</p>
                  <Button variant="outline" onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 5000]);
                    setSelectedManufacturers([]);
                    setSearchQuery('');
                  }}>
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold font-heading text-center mb-12">Наши услуги</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Package',
                title: 'Продажа покрытий',
                description: 'Широкий ассортимент напольных покрытий от ведущих производителей с гарантией качества'
              },
              {
                icon: 'Hammer',
                title: 'Профессиональная укладка',
                description: 'Опытные мастера выполнят укладку любой сложности с соблюдением всех технологий'
              },
              {
                icon: 'Truck',
                title: 'Доставка по Москве',
                description: 'Бесплатная доставка при заказе от 50 000 ₽. Доставка в регионы транспортными компаниями'
              }
            ].map((service, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name={service.icon as any} size={40} className="text-accent" />
                  </div>
                  <h4 className="text-xl font-bold font-heading mb-4">{service.title}</h4>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold font-heading mb-6">О компании Главпаркет</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Более 15 лет мы специализируемся на продаже и укладке напольных покрытий премиум-класса. 
              Работаем только с проверенными производителями и предоставляем полный цикл услуг.
            </p>
            <div className="grid md:grid-cols-4 gap-8 mt-12">
              {[
                { number: '15+', label: 'лет на рынке' },
                { number: '5000+', label: 'довольных клиентов' },
                { number: '50+', label: 'брендов в наличии' },
                { number: '100%', label: 'гарантия качества' }
              ].map((stat, index) => (
                <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-3xl font-bold font-heading mb-6">Контакты</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={20} className="mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Адрес</p>
                    <p className="text-white/80">г. Москва, Нахимовский проспект, д. 24</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={20} className="mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Телефон</p>
                    <a href="tel:+74951234567" className="text-white/80 hover:text-white">+7 (495) 123-45-67</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={20} className="mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href="mailto:info@profparket.ru" className="text-white/80 hover:text-white">info@profparket.ru</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={20} className="mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Режим работы</p>
                    <p className="text-white/80">Пн-Пт: 9:00 - 20:00<br />Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold font-heading mb-6">Обратная связь</h4>
              <form className="space-y-4">
                <Input 
                  placeholder="Ваше имя" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Input 
                  type="tel"
                  placeholder="Телефон" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Input 
                  type="email"
                  placeholder="Email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Отправить заявку
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary/95 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">&copy; 2024 Главпаркет. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}