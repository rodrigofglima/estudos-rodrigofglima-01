package modules.product.service;

import br.com.cursoudemy.productapi.model.Category;
import modules.product.dto.CategoryRequest;
import modules.product.dto.CategoryResponse;
import modules.product.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryResponse save(CategoryRequest request) {
        var category = categoryRepository.save(Category.of(request));
        return CategoryResponse.of(category);
    }

    private void validateCategoryNameInformed(CategoryRequest request){
        if (isEmpty(request.getDescription())) {

        }
    }

}
