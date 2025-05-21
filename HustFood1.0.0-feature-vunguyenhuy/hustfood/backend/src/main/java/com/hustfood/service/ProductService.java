package com.hustfood.service;

import com.hustfood.dto.ProductCreateRequest;
import com.hustfood.dto.ProductListResponse;
import com.hustfood.dto.ProductResponseDTO;
import com.hustfood.entity.Product;
import com.hustfood.exception.ProductNotFoundException;
import com.hustfood.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    private static final List<String> FIXED_CATEGORIES = List.of(
            "uu-dai", "mon-moi", "combo-1-nguoi", "combo-nhom",
            "ga-ran", "burger", "thuc-an-nhe", "do-uong"
    );

    public List<ProductResponseDTO> searchProducts(String query) {
        String q = query.trim().toLowerCase();
        List<Product> products;

        if (FIXED_CATEGORIES.contains(q)) {
            if (q.equals("combo-1-nguoi") || q.equals("combo-nhom")) {
                // Nếu từ khoá là combo, tìm theo category.combo
                products = productRepository.findByCategoryCombo(q);
            } else if (q.equals("mon-moi")) {
                // Nếu từ khoá là món mới, tìm theo category.mon_moi
                products = productRepository.findByCategoryMonMoi();
            } else if (q.equals("uu-dai")) {
                // Nếu từ khoá là ưu đãi, tìm theo category.uu_dai
                products = productRepository.findByCategoryUuDai(q);
            } else {
                // Nếu từ khoá là loại cố định khác, tìm theo category.query
                products = productRepository.findByCategoryQuery(q);
            }

        } else {
            // Nếu không, tìm theo tên sản phẩm hoặc mô tả
            products = productRepository.searchProductsByKeyword(q);
        }

        return products.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProductResponseDTO getProductDTOById(Long id) {
        return productRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        updatedProduct.setProductId(id);
        return productRepository.save(updatedProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }

    public List<Product> getTopSellingProducts() {
        return productRepository.findTopSellingProducts();
    }

    private ProductResponseDTO toDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setProductId(product.getProductId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setUrlImg(product.getUrlImg());
        dto.setPrice(product.getPrice());
        return dto;
    }
    // GET - Lấy danh sách sản phẩm (cho admin)
    public List<ProductListResponse> getAllProductsForAdmin() {
        return productRepository.findAll().stream().map(product -> {
            ProductListResponse dto = new ProductListResponse();
            dto.setProductId(product.getProductId());
            dto.setName(product.getName());
            dto.setPrice(product.getPrice());
            dto.setStock(product.getStock());
            dto.setSoldQuantity(product.getSoldQuantity());
            dto.setCategoryId(product.getCategoryId());
            dto.setUrlImg(product.getUrlImg());
            return dto;
        }).collect(Collectors.toList());
    }

    // POST - Tạo sản phẩm mới
    public Long createProduct(ProductCreateRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategoryId(request.getCategoryId());
        product.setCategory_id_uu_dai(request.getCategory_id_uu_dai());
        product.setCategory_id_combo(request.getCategory_id_combo());
        product.setUrlImg(request.getUrlImg());

        return productRepository.save(product).getProductId();
    }
}