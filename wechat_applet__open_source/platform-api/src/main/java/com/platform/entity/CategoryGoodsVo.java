package com.platform.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 *
 */
@Data
public class CategoryGoodsVo extends AttributeCategoryVo implements Serializable {
    private static final long serialVersionUID = 1L;

    //
    private Integer id;
    //
    private String name;
    //
    private Integer enabled;

    private String iconUrl;

    private List<GoodsVo> goods;
}
