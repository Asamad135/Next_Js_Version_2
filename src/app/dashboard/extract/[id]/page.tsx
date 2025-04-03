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
import { Star, DeliveryTruck, Certificate } from '@carbon/icons-react';
import styles from './ProductDetails.module.scss';

interface ProductDetails {
  id: number;
  title: string;
  thumbnail: string;
  images: string[];
  category: string;
  brand: string;
  price: number;
  discountPercentage?: number;
  description: string;
  sku?: string;
  stock: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  rating: number;
  reviews?: Array<{
    reviewerName: string;
    date: string;
    rating: number;
    comment: string;
  }>;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetails({ params }: PageProps) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [thumbnailsLoading, setThumbnailsLoading] = useState<Record<string, boolean>>({});

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleThumbnailLoad = (imageUrl: string) => {
    setThumbnailsLoading(prev => ({
      ...prev,
      [imageUrl]: false
    }));
  };

  useEffect(() => {
    if (!params?.id) return;

    fetch(`https://dummyjson.com/products/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data: ProductDetails) => {
        setProduct(data);
        setSelectedImage(data.thumbnail); // Set initial image
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
      // Initialize loading states for thumbnails
      const initialLoadingState: Record<string, boolean> = {
        [product.thumbnail]: true,
        ...(product.images?.reduce((acc, img) => ({
          ...acc,
          [img]: true
        }), {}))
      };
      setThumbnailsLoading(initialLoadingState);
    }
  }, [product?.thumbnail, product?.images]);

  if (loading) {
    return <Loading description="Loading product details" />;
  }

  if (error || !product) {
    return (
      <div>
        <Tile>
          <h1>Error</h1>
          <p>{error || 'Product not found'}</p>
        </Tile>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Grid condensed>
        {/* Main Product Section */}
        <Column sm={4} md={8} lg={16}>
          <Tile className={styles.mainTile}>
            <Grid condensed>
              {/* Left Column - Images */}
              <Column sm={4} md={4} lg={8} className={styles.imageColumn}>
                <div className={styles.mainImageContainer}>
                  {imageLoading && (
                    <SkeletonPlaceholder className={styles.imageSkeleton} />
                  )}
                  <img 
                    src={selectedImage} 
                    alt={product.title} 
                    className={`${styles.mainImage} ${imageLoading ? styles.hidden : ''}`}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className={styles.thumbnailGrid}>
                  <div className={styles.thumbnailWrapper}>
                    {thumbnailsLoading[product.thumbnail] && (
                      <SkeletonPlaceholder className={styles.thumbnailSkeleton} />
                    )}
                    <img 
                      src={product.thumbnail}
                      alt={`${product.title} thumbnail`}
                      className={`${styles.thumbnail} ${selectedImage === product.thumbnail ? styles.selected : ''} ${thumbnailsLoading[product.thumbnail] ? styles.hidden : ''}`}
                      onClick={() => setSelectedImage(product.thumbnail)}
                      onLoad={() => handleThumbnailLoad(product.thumbnail)}
                    />
                  </div>
                  {product.images?.map((img, index) => (
                    <div key={index} className={styles.thumbnailWrapper}>
                      {thumbnailsLoading[img] && (
                        <SkeletonPlaceholder className={styles.thumbnailSkeleton} />
                      )}
                      <img 
                        src={img}
                        alt={`${product.title} view ${index + 1}`}
                        className={`${styles.thumbnail} ${selectedImage === img ? styles.selected : ''} ${thumbnailsLoading[img] ? styles.hidden : ''}`}
                        onClick={() => setSelectedImage(img)}
                        onLoad={() => handleThumbnailLoad(img)}
                      />
                    </div>
                  ))}
                </div>
              </Column>

              {/* Right Column - Product Info */}
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
                  {product.discountPercentage && (
                    <Tag type="red">{product.discountPercentage}% OFF</Tag>
                  )}
                </div>

                <p className={styles.description}>{product.description}</p>

                <div className={styles.basicDetails}>
                  <div className={styles.detailItem}>
                    <strong>SKU:</strong> {product.sku}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Stock:</strong> {product.stock} units
                  </div>
                </div>
              </Column>
            </Grid>
          </Tile>
        </Column>

        {/* Information Tabs Section */}
        <Column sm={4} md={8} lg={16}>
          <Tile className={styles.infoTabs}>
            <Tabs>
              <TabList aria-label="Product Information">
                <Tab>Specifications</Tab>
                <Tab>Shipping</Tab>
                <Tab>Reviews</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div className={styles.specGrid}>
                    {product.dimensions && (
                      <div className={styles.specItem}>
                        <strong>Dimensions:</strong>
                        <p>{`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`}</p>
                      </div>
                    )}
                    {product.weight && (
                      <div className={styles.specItem}>
                        <strong>Weight:</strong>
                        <p>{product.weight} kg</p>
                      </div>
                    )}
                    {product.warrantyInformation && (
                      <div className={styles.specItem}>
                        <strong>Warranty:</strong>
                        <p>{product.warrantyInformation}</p>
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className={styles.shippingInfo}>
                    <DeliveryTruck size={32} />
                    <h4>Shipping Information</h4>
                    <p>{product.shippingInformation}</p>
                    <Certificate size={32} />
                    <h4>Return Policy</h4>
                    <p>{product.returnPolicy}</p>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className={styles.reviewSection}>
                    <div className={styles.overallRating}>
                      <Star size={32} />
                      <h2>{product.rating}</h2>
                      <p>out of 5</p>
                    </div>
                    {product.reviews?.map((review, index) => (
                      <div key={index} className={styles.review}>
                        <div className={styles.reviewHeader}>
                          <strong>{review.reviewerName}</strong>
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.rating}>
                          {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
}