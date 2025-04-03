'use client'
import { useEffect, useState } from 'react';
import {
  Loading,
  Tile,
  Grid,
  Column,
  Tag,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SkeletonPlaceholder,
} from '@carbon/react';
import {Certificate} from '@carbon/icons-react';
import styles from './ProductDetails.module.scss';

interface ProductDetails {
  readonly id: number;
  readonly title: string;
  readonly thumbnail: string;
  readonly images: readonly string[];
  readonly category: string;
  readonly brand: string;
  readonly price: number;
  readonly discountPercentage?: number;
  readonly description: string;
  readonly sku?: string;
  readonly stock: number;
  readonly dimensions?: {
    readonly width: number;
    readonly height: number;
    readonly depth: number;
  };
  readonly weight?: number;
  readonly warrantyInformation?: string;
  readonly shippingInformation?: string;
  readonly returnPolicy?: string;
  readonly rating: number;
  readonly reviews?: ReadonlyArray<{
    readonly reviewerName: string;
    readonly date: string;
    readonly rating: number;
    readonly comment: string;
  }>;
}

interface PageProps {
  readonly params: {
    readonly id: string;
  };
}

export default function ProductDetails({ params }: PageProps) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [thumbnailsLoading, setThumbnailsLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!params?.id) return;

    fetch(`https://dummyjson.com/products/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data: ProductDetails) => {
        setProduct(data);
        setSelectedImage(data.thumbnail);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [params?.id]);

  useEffect(() => {
    if (product?.thumbnail) {
      setImageLoading(true);
      const initialLoadingState: Record<string, boolean> = {
        [product.thumbnail]: true,
        ...product.images.reduce((acc, img) => ({
          ...acc,
          [img]: true,
        }), {}),
      };
      setThumbnailsLoading(initialLoadingState);
    }
  }, [product?.thumbnail, product?.images]);

  if (loading) {
    return <Loading description="Loading product details" />;
  }

  if (error || !product) {
    return (
      <Tile className={styles.errorTile}>
        <h1>Error</h1>
        <p>{error ?? 'Product not found'}</p>
      </Tile>
    );
  }

  return (
    <div className={styles.container}>
      <Grid condensed>
        <Column sm={4} md={8} lg={16}>
          <Tile className={styles.mainTile}>
            <Grid condensed>
              <Column sm={4} md={4} lg={8} className={styles.imageColumn}>
                <div className={styles.mainImageContainer}>
                  {imageLoading && <SkeletonPlaceholder className={styles.imageSkeleton} />}
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className={`${styles.mainImage} ${imageLoading ? styles.hidden : ''}`}
                    onLoad={() => setImageLoading(false)}
                  />
                </div>
                <div className={styles.thumbnailGrid}>
                  {[product.thumbnail, ...product.images].map((img) => (
                    <button
                      key={img}
                      className={styles.thumbnailButton}
                      onClick={() => setSelectedImage(img)}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(img)}
                    >
                      {thumbnailsLoading[img] && <SkeletonPlaceholder className={styles.thumbnailSkeleton} />}
                      <img
                        src={img}
                        alt={product.title}
                        className={`${styles.thumbnail} ${selectedImage === img ? styles.selected : ''} ${thumbnailsLoading[img] ? styles.hidden : ''}`}
                        onLoad={() => setThumbnailsLoading(prev => ({ ...prev, [img]: false }))}
                      />
                    </button>
                  ))}
                </div>
              </Column>
              <Column sm={4} md={4} lg={8} className={styles.infoColumn}>
                <div className={styles.productHeader}>
                  <h1 className={styles.productTitle}>{product.title}</h1>
                  <div className={styles.tags}>
                    <Tag type="blue">{product.category}</Tag>
                    <Tag type="green">{product.brand}</Tag>
                  </div>
                </div>
                <div className={styles.priceSection}>
                  <div className={styles.price}>${product.price}</div>
                  {product.discountPercentage && <Tag type="red">{product.discountPercentage}% OFF</Tag>}
                </div>
                <p className={styles.description}>{product.description}</p>
              </Column>
            </Grid>
          </Tile>
          <Tabs>
            <TabList>
              <Tab>Specifications</Tab>
              <Tab>Shipping</Tab>
              <Tab>Reviews</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {product.dimensions && <p><strong>Dimensions:</strong> {product.dimensions.width} &times; {product.dimensions.height} &times; {product.dimensions.depth}</p>}
                {product.weight && <p><strong>Weight:</strong> {product.weight} kg</p>}
                {product.warrantyInformation && <p><strong>Warranty:</strong> {product.warrantyInformation}</p>}
              </TabPanel>
              <TabPanel>
                <p><strong>Shipping Information:</strong> {product.shippingInformation ?? 'No shipping information available'}</p>
                <Certificate size={32} />
                <h4>Return Policy</h4>
                <p>{product.returnPolicy}</p>
              </TabPanel>
              <TabPanel>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <div key={review.reviewerName} className={styles.review}>
                      <strong>{review.reviewerName}</strong>
                      <p>{review.comment}</p>
                      <p>Rating: {review.rating} / 5</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available.</p>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Column>
      </Grid>
    </div>
  );
}
