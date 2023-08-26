import paperCover from '../../../assets/paper-cover.jpeg';

const products = [
  {
    id: 1,
    name: 'Botany - Structure Dev and Reproduction in flowering plants',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '2023',
    color: 'B.Sc B.Ed',
  },
  {
    id: 2,
    name: 'Botany - Structure Dev and ...',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '2023',
    color: 'B.Sc B.Ed',
  },
  // More products...
];

export default function Papers() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Maharshi Dayananda Saraswati University
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between relative  p-1 bg-indigo-100 rounded"
            >
              <div>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                  <div
                    alt={product.imageAlt}
                    className="h-full w-full  flex flex-col justify-between items-center  object-cover object-center  rounded-sm"
                  >
                    <img
                      src={paperCover}
                      alt=""
                      className="w-full h-full rounded-sm"
                    />
                  </div>
                </div>
                <div className=" flex flex-col justify-between ">
                  <h2 className="text-md font-semibold text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.color} - 3rd year
                  </p>
                  <p className="text-sm font-semibold text-gray-500">
                    {product.price}
                  </p>
                </div>
              </div>
              <button className="hero-btn">Select</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
