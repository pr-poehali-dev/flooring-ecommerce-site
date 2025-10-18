import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
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
  description: string;
  specs: {
    size: string;
    coating: string;
    country: string;
    warranty: string;
  };
}

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
    inStock: true,
    description: 'Паркетная доска из натурального дуба с естественной текстурой древесины. Идеально подходит для жилых помещений и офисов. Покрытие устойчиво к царапинам и истиранию.',
    specs: {
      size: '2200 x 188 мм',
      coating: 'Матовый лак',
      country: 'Швеция',
      warranty: '25 лет'
    }
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
    inStock: true,
    description: 'Влагостойкий ламинат с технологией Hydroseal для использования в помещениях с повышенной влажностью. Реалистичная текстура дерева с фаской V-образной формы.',
    specs: {
      size: '1380 x 190 мм',
      coating: 'Влагостойкий HDF',
      country: 'Бельгия',
      warranty: '25 лет'
    }
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
    inStock: true,
    description: 'Виниловая плитка с замковым соединением. Водостойкая, идеальна для кухни и ванной. Теплая и комфортная поверхность с защитным слоем.',
    specs: {
      size: '457 x 457 мм',
      coating: 'Защитный PU слой',
      country: 'Франция',
      warranty: '15 лет'
    }
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
    inStock: true,
    description: 'Доступный ламинат с отличным соотношением цена-качество. Система замка Twin Clic обеспечивает быструю и легкую укладку.',
    specs: {
      size: '1285 x 192 мм',
      coating: 'Меламиновая пленка',
      country: 'Германия',
      warranty: '20 лет'
    }
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
    inStock: false,
    description: 'Премиальная трехслойная паркетная доска из ясеня. Выразительная текстура и высокая прочность. Обработка маслом для естественного вида.',
    specs: {
      size: '2200 x 207 мм',
      coating: 'Масло-воск',
      country: 'Польша',
      warranty: '30 лет'
    }
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
    inStock: true,
    description: 'Бытовой линолеум на вспененной основе. Мягкий и теплый, с защитным слоем от загрязнений. Простой в уходе.',
    specs: {
      size: 'Рулон 2-4 м',
      coating: 'Защитный PUR',
      country: 'Россия',
      warranty: '10 лет'
    }
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
    inStock: true,
    description: 'Ламинат с технологией AquaProtect для повышенной влагостойкости. Реалистичная поверхность с синхронным тиснением.',
    specs: {
      size: '1291 x 193 мм',
      coating: 'AquaProtect',
      country: 'Австрия',
      warranty: '25 лет'
    }
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
    inStock: true,
    description: 'Паркетная доска с выразительной текстурой и сучками. Создает уютную атмосферу в интерьере. Покрытие лаком в 7 слоев.',
    specs: {
      size: '2000 x 162 мм',
      coating: 'Глянцевый лак',
      country: 'Швеция',
      warranty: '20 лет'
    }
  }
];

const relatedProducts = [
  {
    id: 101,
    name: 'Плинтус МДФ 80мм',
    price: 250,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/058a28e9-bc95-4823-b429-3efa8abd586e.jpg'
  },
  {
    id: 102,
    name: 'Подложка 3мм',
    price: 180,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/439d699e-9656-4612-b3e0-dbd98d0df771.jpg'
  },
  {
    id: 103,
    name: 'Порожек алюминиевый',
    price: 320,
    image: 'https://cdn.poehali.dev/projects/fef60a18-ca2d-4971-b39f-f5fa5ea7d2cc/files/d158a67a-f436-4afb-841b-32ee2b6e47b1.jpg'
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="PackageX" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Вернуться в каталог
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Назад в каталог
              </Button>
            </div>
            <h1 className="text-2xl font-bold font-heading text-primary">ProfParket</h1>
            <a href="tel:+74951234567" className="flex items-center gap-2 text-sm font-medium">
              <Icon name="Phone" size={18} />
              <span className="hidden md:inline">+7 (495) 123-45-67</span>
            </a>
          </div>
        </div>
      </header>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-lg py-2 px-4">
                    Под заказ
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[product.image, product.image, product.image].map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden border-2 border-primary/20 cursor-pointer hover:border-primary transition-colors">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">{product.manufacturer}</Badge>
                <h1 className="text-4xl font-bold font-heading mb-4">{product.name}</h1>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-5xl font-bold text-accent">{product.price}</span>
                  <span className="text-2xl text-muted-foreground">₽/м²</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Наличие:</span>
                  <span className="font-semibold flex items-center gap-2">
                    {product.inStock ? (
                      <>
                        <Icon name="CheckCircle2" size={16} className="text-green-600" />
                        В наличии
                      </>
                    ) : (
                      <>
                        <Icon name="Clock" size={16} className="text-orange-600" />
                        Под заказ (7-10 дней)
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Артикул:</span>
                  <span className="font-semibold">PRF-{product.id.toString().padStart(6, '0')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Класс износостойкости:</span>
                  <span className="font-semibold">{product.wearClass}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Толщина:</span>
                  <span className="font-semibold">{product.thickness}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Количество, м²</label>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Icon name="Minus" size={18} />
                    </Button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-20 text-center text-lg font-semibold border rounded-md py-2"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Icon name="Plus" size={18} />
                    </Button>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-muted-foreground">Итого</p>
                      <p className="text-2xl font-bold">{(product.price * quantity).toLocaleString()} ₽</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90">
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Добавить в корзину
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Heart" size={20} />
                  </Button>
                </div>
              </div>

              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Truck" size={24} className="text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Бесплатная доставка</p>
                      <p className="text-sm text-muted-foreground">При заказе от 50 000 ₽ по Москве в пределах МКАД</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Hammer" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Профессиональная укладка</p>
                      <p className="text-sm text-muted-foreground">От 350 ₽/м². Гарантия на работы 2 года</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specs">Характеристики</TabsTrigger>
              <TabsTrigger value="delivery">Доставка и оплата</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6 space-y-4">
              <p className="text-lg leading-relaxed">{product.description}</p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Shield" size={24} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Гарантия качества</h4>
                        <p className="text-sm text-muted-foreground">
                          Официальная гарантия производителя {product.specs.warranty}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Award" size={24} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Сертификаты</h4>
                        <p className="text-sm text-muted-foreground">
                          Соответствует европейским стандартам качества
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="mt-6">
              <div className="space-y-3">
                {[
                  { label: 'Производитель', value: product.manufacturer },
                  { label: 'Страна производства', value: product.specs.country },
                  { label: 'Размер планки', value: product.specs.size },
                  { label: 'Толщина', value: product.thickness },
                  { label: 'Класс износостойкости', value: product.wearClass },
                  { label: 'Тип покрытия', value: product.specs.coating },
                  { label: 'Гарантия', value: product.specs.warranty }
                ].map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="delivery" className="mt-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Доставка</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <p>Бесплатная доставка по Москве в пределах МКАД при заказе от 50 000 ₽</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <p>Доставка за МКАД: 35 ₽/км от МКАД</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <p>Доставка в регионы транспортными компаниями</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-4">Оплата</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <p>Наличными при получении</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <p>Банковской картой на сайте или при получении</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <p>Безналичный расчет для юридических лиц</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold font-heading mb-8">С этим товаром покупают</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-semibold mb-2">{item.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-accent">{item.price} ₽</span>
                    <Button size="sm" variant="outline">
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">&copy; 2024 ProfParket. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
