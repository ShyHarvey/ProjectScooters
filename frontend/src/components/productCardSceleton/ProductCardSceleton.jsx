import React from "react"
import ContentLoader from "react-content-loader"

const ProductCardSceleton = (props) => (
  <ContentLoader 
    speed={2}
    width={245}
    height={332}
    viewBox="0 0 245 332"
    backgroundColor="#e0e0e0"
    foregroundColor="#d1d2fa"
    {...props}
  >
    <rect x="3" y="7" rx="21" ry="21" width="232" height="175" /> 
    <rect x="6" y="191" rx="11" ry="11" width="227" height="36" /> 
    <rect x="5" y="235" rx="21" ry="21" width="230" height="49" /> 
    <rect x="6" y="292" rx="13" ry="13" width="113" height="30" /> 
    <rect x="130" y="292" rx="17" ry="17" width="98" height="31" />
  </ContentLoader>
)

export default ProductCardSceleton

